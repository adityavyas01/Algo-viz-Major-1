-- Fix for Missing Profiles - Run this in Supabase SQL Editor
-- This script will create profiles for existing authenticated users who don't have them

-- 1. First, let's check what users exist in auth.users but not in profiles
SELECT 
  u.id, 
  u.email, 
  u.created_at as auth_created,
  u.raw_user_meta_data->>'full_name' as full_name,
  p.id as profile_exists
FROM auth.users u 
LEFT JOIN public.profiles p ON u.id = p.user_id
WHERE p.id IS NULL;

-- 2. Create missing profiles for existing users
INSERT INTO public.profiles (user_id, display_name)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)) as display_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
WHERE p.id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- 3. Also create user_stats for these users if they don't exist
INSERT INTO public.user_stats (user_id)
SELECT u.id
FROM auth.users u
LEFT JOIN public.user_stats s ON u.id = s.user_id
WHERE s.id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- 4. Verify the trigger function exists and recreate if needed
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Create user stats
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Recreate the trigger (drop first to avoid conflicts)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Final verification - this should show all your users with profiles
SELECT 
  u.email,
  p.display_name,
  s.level,
  s.total_points
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id  
LEFT JOIN public.user_stats s ON u.id = s.user_id
ORDER BY u.created_at DESC;
