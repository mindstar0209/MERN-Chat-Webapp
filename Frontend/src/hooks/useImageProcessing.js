import { useState } from 'react';

const useImageProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (file) => {
    setIsProcessing(true);
    try {
      // Check file size (e.g., max 1MB)
      const MAX_FILE_SIZE = 1024 * 1024; // 1MB
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size should be less than 1MB");
      }

      // Optional: Compress image if needed
      const compressImage = async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800;
              const scaleSize = MAX_WIDTH / img.width;
              canvas.width = MAX_WIDTH;
              canvas.height = img.height * scaleSize;
              
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
          };
        });
      };

      const processedImage = await compressImage(file);
      setIsProcessing(false);
      return processedImage;
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  };

  return { processImage, isProcessing };
};

export default useImageProcessing;