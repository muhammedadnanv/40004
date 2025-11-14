import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { uploadImage, convertToWebP, ImageUploadResult } from '@/utils/imageUpload';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onUploadComplete?: (result: ImageUploadResult) => void;
  folder?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  className?: string;
  convertToWebp?: boolean;
}

export const ImageUpload = ({
  onUploadComplete,
  folder = 'uploads',
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  className,
  convertToWebp = true
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: `Please upload one of: ${acceptedFormats.join(', ')}`,
        variant: 'destructive'
      });
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast({
        title: 'File too large',
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: 'destructive'
      });
      return;
    }

    try {
      setUploading(true);

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Convert to WebP if enabled and not already WebP
      let fileToUpload = file;
      if (convertToWebp && file.type !== 'image/webp') {
        try {
          const webpBlob = await convertToWebP(file);
          fileToUpload = new File([webpBlob], file.name.replace(/\.\w+$/, '.webp'), {
            type: 'image/webp'
          });
          
          toast({
            title: 'Image optimized',
            description: 'Converted to WebP for faster loading'
          });
        } catch (conversionError) {
          console.warn('WebP conversion failed, using original:', conversionError);
        }
      }

      // Upload to CDN
      const result = await uploadImage(fileToUpload, folder);

      toast({
        title: 'Upload successful',
        description: 'Image uploaded and optimized via CDN'
      });

      onUploadComplete?.(result);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive'
      });
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleClear}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'w-full h-48 rounded-lg border-2 border-dashed border-border',
            'hover:border-primary hover:bg-accent/50 transition-colors',
            'flex flex-col items-center justify-center gap-3',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading to CDN...</p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max {maxSizeMB}MB • {acceptedFormats.map(f => f.split('/')[1]).join(', ')}
                </p>
              </div>
            </>
          )}
        </button>
      )}

      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <ImageIcon className="h-3 w-3" />
        <span>Images served via global CDN for optimal performance</span>
      </div>
    </div>
  );
};
