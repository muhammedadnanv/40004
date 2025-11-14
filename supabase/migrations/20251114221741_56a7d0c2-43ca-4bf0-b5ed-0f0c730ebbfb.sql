-- Create storage bucket for optimized images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the images bucket
CREATE POLICY "Public images are viewable by everyone" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create a table to track image metadata and CDN optimization
CREATE TABLE IF NOT EXISTS public.image_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  cdn_url TEXT,
  webp_url TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  mime_type TEXT,
  is_optimized BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on image_assets
ALTER TABLE public.image_assets ENABLE ROW LEVEL SECURITY;

-- Policies for image_assets
CREATE POLICY "Image metadata is viewable by everyone"
ON public.image_assets FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create image metadata"
ON public.image_assets FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own image metadata"
ON public.image_assets FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own image metadata"
ON public.image_assets FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_image_assets_user_id ON public.image_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_image_assets_storage_path ON public.image_assets(storage_path);
CREATE INDEX IF NOT EXISTS idx_image_assets_optimized ON public.image_assets(is_optimized);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_image_assets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS update_image_assets_updated_at ON public.image_assets;
CREATE TRIGGER update_image_assets_updated_at
BEFORE UPDATE ON public.image_assets
FOR EACH ROW
EXECUTE FUNCTION public.update_image_assets_updated_at();