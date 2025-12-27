-- Create storage bucket for testimonial images
INSERT INTO storage.buckets (id, name, public)
VALUES ('testimonial-images', 'testimonial-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view testimonial images
CREATE POLICY "Anyone can view testimonial images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'testimonial-images');

-- Allow authenticated admins to upload testimonial images
CREATE POLICY "Admins can upload testimonial images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'testimonial-images' AND auth.uid() IS NOT NULL);

-- Allow admins to update their testimonial images
CREATE POLICY "Admins can update testimonial images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'testimonial-images' AND auth.uid() IS NOT NULL);

-- Allow admins to delete testimonial images
CREATE POLICY "Admins can delete testimonial images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'testimonial-images' AND auth.uid() IS NOT NULL);