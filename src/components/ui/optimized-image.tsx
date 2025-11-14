import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    // Check if the browser supports WebP
    const checkWebPSupport = async () => {
      const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
      const img = new Image();
      
      return new Promise<boolean>((resolve) => {
        img.onload = () => resolve(img.width === 2);
        img.onerror = () => resolve(false);
        img.src = webpData;
      });
    };

    checkWebPSupport().then((supportsWebP) => {
      // For external URLs or already optimized images, use as-is
      if (src.startsWith('http') || src.startsWith('data:')) {
        setCurrentSrc(src);
      } else {
        // Try WebP first if supported, fallback to original
        setCurrentSrc(supportsWebP && !src.endsWith('.svg') ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : src);
      }
    });
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // Fallback to original source if WebP fails
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
  };

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!width || src.startsWith('data:')) return undefined;
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map((multiplier) => {
        const scaledWidth = Math.round(width * multiplier);
        return `${currentSrc} ${scaledWidth}w`;
      })
      .join(', ');
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        {...props}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        srcSet={generateSrcSet()}
        sizes={width ? `(max-width: ${width}px) 100vw, ${width}px` : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};
