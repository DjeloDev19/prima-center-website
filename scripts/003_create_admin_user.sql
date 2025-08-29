-- Create admin user in auth.users table
-- Note: This should be run after the user signs up through the auth system
-- The user will need to sign up first with email: admin@primacenter.ci

-- Insert admin profile after user signs up
-- This will be linked to the auth.users table via user_id
INSERT INTO public.admin_users (
  user_id,
  email,
  full_name,
  role,
  permissions,
  created_at
) VALUES (
  -- This will need to be updated with the actual user_id after signup
  '00000000-0000-0000-0000-000000000000', -- Placeholder UUID
  'admin@primacenter.ci',
  'Administrateur Prima Center',
  'super_admin',
  ARRAY['manage_boutiques', 'manage_restaurants', 'manage_fitness', 'manage_news', 'manage_settings', 'manage_users'],
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Alternative: Create a function to automatically create admin profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user is the admin email
  IF NEW.email = 'admin@primacenter.ci' THEN
    INSERT INTO public.admin_users (user_id, email, full_name, role, permissions)
    VALUES (
      NEW.id,
      NEW.email,
      'Administrateur Prima Center',
      'super_admin',
      ARRAY['manage_boutiques', 'manage_restaurants', 'manage_fitness', 'manage_news', 'manage_settings', 'manage_users']
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create admin profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
