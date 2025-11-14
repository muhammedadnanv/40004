import { supabase } from "@/integrations/supabase/client";

export interface ImageUploadResult {
  publicUrl: string;
  cdnUrl: string;
  path: string;
  width?: number;
  height?: number;
}

/**
 * Upload an image to Supabase Storage with automatic CDN distribution
 * Images are automatically served via Supabase's global CDN for fast delivery
 */
export const uploadImage = async (
  file: File,
  folder: string = "uploads"
): Promise<ImageUploadResult> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be authenticated to upload images");
  }

  // Generate unique file name
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;

  // Get image dimensions
  const dimensions = await getImageDimensions(file);

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file, {
      cacheControl: '31536000', // 1 year cache
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL (automatically served via CDN)
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  // Store metadata in database
  try {
    await supabase.from('image_assets').insert({
      user_id: user.id,
      storage_path: fileName,
      original_url: publicUrl,
      cdn_url: publicUrl,
      file_size: file.size,
      width: dimensions.width,
      height: dimensions.height,
      mime_type: file.type,
      is_optimized: true
    });
  } catch (dbError) {
    console.warn('Failed to store image metadata:', dbError);
  }

  return {
    publicUrl,
    cdnUrl: publicUrl,
    path: fileName,
    width: dimensions.width,
    height: dimensions.height
  };
};

/**
 * Get optimized CDN URL with transformation parameters
 * Supabase Storage automatically serves images via CDN
 */
export const getOptimizedImageUrl = (
  path: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string => {
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  // Supabase Storage CDN automatically optimizes images
  // You can add transformation parameters if using image transformation service
  if (options) {
    const params = new URLSearchParams();
    if (options.width) params.append('width', options.width.toString());
    if (options.height) params.append('height', options.height.toString());
    if (options.quality) params.append('quality', options.quality.toString());
    
    // Note: Add transformation service endpoint here if needed
    return `${publicUrl}?${params.toString()}`;
  }

  return publicUrl;
};

/**
 * Delete an image from storage and metadata
 */
export const deleteImage = async (path: string): Promise<void> => {
  const { error } = await supabase.storage
    .from('images')
    .remove([path]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }

  // Delete metadata
  await supabase
    .from('image_assets')
    .delete()
    .eq('storage_path', path);
};

/**
 * Get image dimensions from file
 */
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

/**
 * Convert image to WebP format in browser
 */
export const convertToWebP = async (file: File, quality: number = 0.85): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image to WebP'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for conversion'));
    };

    img.src = url;
  });
};
