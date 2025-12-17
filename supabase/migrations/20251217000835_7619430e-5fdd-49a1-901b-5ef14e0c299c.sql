-- Enable realtime for page_views table
ALTER TABLE public.page_views REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;