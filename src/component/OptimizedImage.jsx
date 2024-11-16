import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const OptimizedImage = ({ imageFile }) => {
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);

  useEffect(() => {
    const compressImage = async () => {
      const options = {
        maxSizeMB: 0.8,             // Target max size in MB
        maxWidthOrHeight: 1920,     // Max dimensions
        useWebWorker: true,         // Multi-threading
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const compressedUrl = URL.createObjectURL(compressedFile);
        setCompressedImageUrl(compressedUrl);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    };

    if (imageFile) compressImage();
  }, [imageFile]);

  return compressedImageUrl ? (
    <img src={compressedImageUrl} alt="Optimized" />
  ) : (
    <p>Loading image...</p>
  );
};

export default OptimizedImage;
