-- Database Migration Script for AlgoViz
-- Run this in your Supabase SQL Editor to set up missing tables

-- 1. Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create admin_roles table
CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    role TEXT CHECK (role IN ('super_admin', 'tournament_admin', 'content_admin', 'moderator')) NOT NULL,
    permissions JSONB DEFAULT '{}',
    granted_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for notifications
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

-- Create new policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

-- 5. Create RLS Policies for admin_roles (Fixed - no recursion)
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view admin roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Super admins can manage admin roles" ON public.admin_roles;

-- Create new policies
CREATE POLICY "Anyone can view admin roles" 
ON public.admin_roles FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage admin roles" 
ON public.admin_roles FOR ALL 
USING (
  -- Simple policy: Allow service role and users to view their own records
  auth.role() = 'service_role' OR
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON public.admin_roles(user_id);

-- 7. Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create triggers for updated_at
CREATE TRIGGER handle_notifications_updated_at
    BEFORE UPDATE ON public.notifications
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_admin_roles_updated_at
    BEFORE UPDATE ON public.admin_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 9. Grant admin access (optional)
-- After running this script and registering your first user, you can grant admin access by running:
-- 
-- First, find your user ID by checking the auth.users table:
-- SELECT id, email FROM auth.users;
-- 
-- Then grant super admin access:
-- INSERT INTO public.admin_roles (user_id, role, permissions) 
-- VALUES ('your-actual-user-id-from-above', 'super_admin', '{"manage_users": true, "manage_content": true, "manage_tournaments": true}')
-- ON CONFLICT (user_id) DO NOTHING;
--
-- Note: Replace 'your-actual-user-id-from-above' with the actual UUID from the auth.users table
