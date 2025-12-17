-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_role TEXT,
  customer_company TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  customer_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published testimonials"
ON public.testimonials
FOR SELECT
USING (published = true AND deleted_at IS NULL);

CREATE POLICY "Admins can view all testimonials"
ON public.testimonials
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update testimonials"
ON public.testimonials
FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete testimonials"
ON public.testimonials
FOR DELETE
USING (is_admin(auth.uid()));

-- Create index for soft delete queries
CREATE INDEX idx_testimonials_deleted_at ON public.testimonials(deleted_at);

-- Create index for ordering
CREATE INDEX idx_testimonials_display_order ON public.testimonials(display_order);

-- Trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();