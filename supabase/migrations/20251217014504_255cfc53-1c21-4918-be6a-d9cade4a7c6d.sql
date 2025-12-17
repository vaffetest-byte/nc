-- Add deleted_at column for soft delete
ALTER TABLE public.form_submissions 
ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create index for efficient trash queries
CREATE INDEX idx_form_submissions_deleted_at ON public.form_submissions(deleted_at);

-- Update existing SELECT policy to exclude soft-deleted items
DROP POLICY IF EXISTS "Admin can view all submissions" ON public.form_submissions;
CREATE POLICY "Admin can view all submissions" 
ON public.form_submissions 
FOR SELECT 
USING (is_admin(auth.uid()));