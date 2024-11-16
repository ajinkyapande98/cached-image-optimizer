// imageCompressor.js
export async function compressImage(file, options = {}) {
  const {
    maxWidthOrHeight = 1920,
    quality = 0.8,               // Compression quality (0-1)
    outputFormat = 'image/jpeg'   // Output format
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Resize while keeping the aspect ratio
      if (width > height && width > maxWidthOrHeight) {
        height = (maxWidthOrHeight / width) * height;
        width = maxWidthOrHeight;
      } else if (height > width && height > maxWidthOrHeight) {
        width = (maxWidthOrHeight / height) * width;
        height = maxWidthOrHeight;
      }

      // Set canvas dimensions and draw the image
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Compress and output image
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Compression failed"));
          }
        },
        outputFormat,
        quality
      );
    };
    img.onerror = (error) => reject(error);
  });
}
