// CompressCacheImage.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compressAndCacheImage, getCompressedImageFromDB, storeCompressedImageInDB } from '../helper/indexedDBCompression';

const CompressCacheImage = ({
  image,
  name,
  ImageCompression = true,
  width,
  height,
  style,
  alt = name,
  onClick,
  className,
  placeholder = "", // Optional placeholder image
  compressionSettings = { maxWidthOrHeight: 1920, quality: 0.8 } // Default compression settings
}) => {
  const [displayImage, setDisplayImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!image || !name) {
      console.error("Both 'image' and 'name' props are required.");
      setError("Image or name missing.");
      return;
    }

    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const cachedImageBlob = await getCompressedImageFromDB(name);
        if (cachedImageBlob) {
          const cachedImageUrl = URL.createObjectURL(cachedImageBlob);
          setDisplayImage(cachedImageUrl);
          return;
        }

        const response = await fetch(image);
        if (!response.ok) throw new Error("Failed to fetch image.");

        const blob = await response.blob();
        let finalBlob;

        if (ImageCompression) {
          try {
            finalBlob = await compressAndCacheImage(blob, compressionSettings, name);
          } catch (compressionError) {
            console.warn("Compression failed, storing original image:", compressionError);
            await storeCompressedImageInDB(name, blob);
            finalBlob = blob;
          }
        } else {
          await storeCompressedImageInDB(name, blob);
          finalBlob = blob;
        }

        const imageUrl = URL.createObjectURL(finalBlob);
        setDisplayImage(imageUrl);
      } catch (error) {
        console.error("Failed to load and process image:", error);
        setError("Image failed to load.");
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();

    return () => {
      if (displayImage) URL.revokeObjectURL(displayImage);
    };
  }, [image, name, ImageCompression, compressionSettings]);

  return (
    <div>
      {isLoading ? (
        <p>Loading image...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        displayImage && (
          <img
            src={displayImage}
            alt={alt}
            width={width || "auto"}
            height={height || "auto"}
            style={style}
            onClick={onClick}
            className={className} // Apply className
            placeholder={placeholder} // Apply placeholder
          />
        )
      )}
    </div>
  );
};

// Define prop types for validation
CompressCacheImage.propTypes = {
  image: PropTypes.string.isRequired, // Required image URL as a string
  name: PropTypes.string.isRequired, // Required unique key for caching
  ImageCompression: PropTypes.bool, // Optional boolean for compression toggle
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional width as string or number
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional height as string or number
  style: PropTypes.object, // Optional inline styles object
  alt: PropTypes.string, // Optional alt text for image
  onClick: PropTypes.func, // Optional click handler function
  className: PropTypes.string, // Optional class name for image
  placeholder: PropTypes.string, // Optional placeholder image URL
  compressionSettings: PropTypes.shape({
    maxWidthOrHeight: PropTypes.number, // Max dimension for compression
    quality: PropTypes.number // Compression quality
  }), // Optional settings object for compression
};

// Define default props for optional values
CompressCacheImage.defaultProps = {
  ImageCompression: true,
  width: "auto",
  height: "auto",
  style: {},
  alt: "",
  className: "",
  placeholder: "",
  compressionSettings: { maxWidthOrHeight: 1920, quality: 0.8 }
};

export default CompressCacheImage;
