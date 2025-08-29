-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can only see their own data
CREATE POLICY "admin_users_select_own" ON public.admin_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admin_users_insert_own" ON public.admin_users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_users_update_own" ON public.admin_users
  FOR UPDATE USING (auth.uid() = id);

-- Create boutiques table
CREATE TABLE IF NOT EXISTS public.boutiques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  category TEXT,
  floor TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  opening_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for boutiques
ALTER TABLE public.boutiques ENABLE ROW LEVEL SECURITY;

-- Allow public read access for boutiques (for website display)
CREATE POLICY "boutiques_select_public" ON public.boutiques
  FOR SELECT USING (true);

-- Only authenticated admin users can modify boutiques
CREATE POLICY "boutiques_insert_admin" ON public.boutiques
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "boutiques_update_admin" ON public.boutiques
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "boutiques_delete_admin" ON public.boutiques
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  cuisine_type TEXT,
  floor TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  opening_hours TEXT,
  price_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for restaurants
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Allow public read access for restaurants
CREATE POLICY "restaurants_select_public" ON public.restaurants
  FOR SELECT USING (true);

-- Only authenticated admin users can modify restaurants
CREATE POLICY "restaurants_insert_admin" ON public.restaurants
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "restaurants_update_admin" ON public.restaurants
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "restaurants_delete_admin" ON public.restaurants
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create fitness services table
CREATE TABLE IF NOT EXISTS public.fitness_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  duration TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for fitness_services
ALTER TABLE public.fitness_services ENABLE ROW LEVEL SECURITY;

-- Allow public read access for fitness services
CREATE POLICY "fitness_services_select_public" ON public.fitness_services
  FOR SELECT USING (true);

-- Only authenticated admin users can modify fitness services
CREATE POLICY "fitness_services_insert_admin" ON public.fitness_services
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "fitness_services_update_admin" ON public.fitness_services
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "fitness_services_delete_admin" ON public.fitness_services
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create news/articles table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for news
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow public read access for published news only
CREATE POLICY "news_select_public" ON public.news
  FOR SELECT USING (published = true);

-- Only authenticated admin users can modify news
CREATE POLICY "news_insert_admin" ON public.news
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "news_update_admin" ON public.news
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "news_delete_admin" ON public.news
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Admin users can see all news (published and unpublished)
CREATE POLICY "news_select_admin" ON public.news
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create site settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access for site settings
CREATE POLICY "site_settings_select_public" ON public.site_settings
  FOR SELECT USING (true);

-- Only authenticated admin users can modify site settings
CREATE POLICY "site_settings_insert_admin" ON public.site_settings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "site_settings_update_admin" ON public.site_settings
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "site_settings_delete_admin" ON public.site_settings
  FOR DELETE USING (auth.uid() IS NOT NULL);
