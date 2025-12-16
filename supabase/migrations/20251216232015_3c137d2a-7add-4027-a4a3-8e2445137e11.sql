-- Create admin_users table for single admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin can view their own record
CREATE POLICY "Admin can view own record"
ON public.admin_users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create form_submissions table to store all form submissions
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL CHECK (form_type IN ('funding', 'broker')),
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_status BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = _user_id
  )
$$;

-- Admin can view all submissions
CREATE POLICY "Admin can view all submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Anyone can insert submissions (public form)
CREATE POLICY "Anyone can submit forms"
ON public.form_submissions
FOR INSERT
WITH CHECK (true);

-- Admin can update submissions (mark as read)
CREATE POLICY "Admin can update submissions"
ON public.form_submissions
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create site_content table for editable content
CREATE TABLE public.site_content (
  id TEXT NOT NULL PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES public.admin_users(id)
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read site content
CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
USING (true);

-- Admin can update site content
CREATE POLICY "Admin can update site content"
ON public.site_content
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin can insert site content
CREATE POLICY "Admin can insert site content"
ON public.site_content
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- Create page_views table for analytics
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert page views
CREATE POLICY "Anyone can log page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- Admin can view all page views
CREATE POLICY "Admin can view page views"
ON public.page_views
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));