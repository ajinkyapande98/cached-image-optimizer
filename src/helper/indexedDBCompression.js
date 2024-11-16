// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('cached-image-optimizer', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

// Function to get an image from IndexedDB by key
export const getCompressedImageFromDB = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readonly');
    const store = transaction.objectStore('images');
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result ? request.result.compressedBlob : null);
    request.onerror = (event) => reject(event.target.error);
  });
};

// Function to store an image in IndexedDB
export const storeCompressedImageInDB = async (customKey, compressedBlob) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readwrite');
    const store = transaction.objectStore('images');
    const request = store.put({ id: customKey, compressedBlob });

    request.onsuccess = () => resolve(true);
    request.onerror = (event) => reject(event.target.error);
  });
};

// Image compression function (simplified)
export const compressImage = async (file, { maxWidthOrHeight = 1920, quality = 0.8 }) => {
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scaleFactor = maxWidthOrHeight / Math.max(img.width, img.height);
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => resolve(blob),
        'image/jpeg',
        quality
      );
    };
  });
};

// Main function for compression and caching
export const compressAndCacheImage = async (file, options, customKey) => {
  let compressedBlob = await getCompressedImageFromDB(customKey);

  if (!compressedBlob) {
    console.log('Compressing and storing image...');
    compressedBlob = await compressImage(file, options);
    await storeCompressedImageInDB(customKey, compressedBlob);
  } else {
    console.log('Image retrieved from IndexedDB');
  }

  return compressedBlob;
};

// Function to retrieve a stored image by key and generate a URL
export const getImageByKey = async (customKey) => {
  const compressedBlob = await getCompressedImageFromDB(customKey);

  if (compressedBlob) {
    return URL.createObjectURL(compressedBlob);
  } else {
    console.error(`No image found with the key: ${customKey}`);
    return null;
  }
};
