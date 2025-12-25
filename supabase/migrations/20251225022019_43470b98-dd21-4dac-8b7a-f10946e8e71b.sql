-- Add UPDATE policy for admin_users so admins can update their own record
CREATE POLICY "Admin can update own record"
ON public.admin_users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);