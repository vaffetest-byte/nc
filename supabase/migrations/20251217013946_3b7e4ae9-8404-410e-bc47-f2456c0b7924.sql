-- Add DELETE policy for admins on form_submissions
CREATE POLICY "Admin can delete submissions" 
ON public.form_submissions 
FOR DELETE 
USING (is_admin(auth.uid()));