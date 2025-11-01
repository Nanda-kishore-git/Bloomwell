import React, { useState, forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';

const SafeImage = forwardRef(({ src, alt, className, ...props }, ref) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [fallbackApplied, setFallbackApplied] = useState(false);
  const loggedRef = useRef(false);

  // Local placeholder as a data URL to avoid external dependencies
  const placeholder = `data:image/svg+xml;base64,${btoa('<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280" font-family="Arial, sans-serif" font-size="14">Image Loading...</text></svg>')}`;

  const handleError = (e) => {
    console.error('SafeImage: Image failed to load - Error event:', e);
    console.error('SafeImage: Failed src:', src);
    console.error('SafeImage: Current imageSrc state:', imageSrc);
    console.error('SafeImage: Fallback applied:', fallbackApplied);
    if (!fallbackApplied) {
      console.log('SafeImage: Applying fallback for failed image:', src);
      setImageSrc(placeholder);
      setFallbackApplied(true);
    }
    if (!loggedRef.current) {
      console.error('SafeImage: Image failed to load (first occurrence):', src);
      loggedRef.current = true;
    }
  };

  const handleLoad = () => {
    console.log('SafeImage: Image loaded successfully:', src);
  };

  return (
    <motion.img
      ref={ref}
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
});

export default SafeImage;