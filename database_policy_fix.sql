-- Quick Fix for Admin Roles Policy Recursion Issue
-- Run this if you're getting infinite recursion errors

-- 1. Drop the problematic policy
DROP POLICY IF EXISTS "Super admins can manage admin roles" ON public.admin_roles;

-- 2. Create a simpler policy that avoids recursion
-- This allows super admins to manage roles without querying the same table
CREATE POLICY "Super admins can manage admin roles" 
ON public.admin_roles FOR ALL 
USING (
  -- Allow if user is authenticated and has super_admin role
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = auth.uid()
    AND u.raw_user_meta_data->>'role' = 'super_admin'
  )
  OR
  -- Allow users to view their own admin status
  (auth.uid() = user_id AND current_setting('request.method', true) = 'GET')
);

-- 3. Alternative: Temporarily disable RLS for admin_roles if issues persist
-- Uncomment the following line only if you need to disable security temporarily:
-- ALTER TABLE public.admin_roles DISABLE ROW LEVEL SECURITY;
