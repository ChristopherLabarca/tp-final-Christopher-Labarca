/**
 * Image upload service
 */

export const imageService = {
  /**
   * Converts file to base64
   */
  fileToBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  },

  /**
   * Uploads image and stores it locally
   */
  uploadImage: async (file: File): Promise<string> => {
    const base64 = await imageService.fileToBase64(file);
    return base64;
  },

  /**
   * Gets stored images from localStorage
   */
  getStoredImages: (): Record<string, string> => {
    const stored = localStorage.getItem('categoryImages');
    return stored ? JSON.parse(stored) : {};
  },

  /**
   * Saves image to category
   */
  saveImageToCategory: (categoryId: string, imageData: string): void => {
    const images = imageService.getStoredImages();
    images[categoryId] = imageData;
    localStorage.setItem('categoryImages', JSON.stringify(images));
  },

  /**
   * Gets image for category
   */
  getImageForCategory: (categoryId: string): string | null => {
    const images = imageService.getStoredImages();
    return images[categoryId] || null;
  },

  /**
   * Deletes image from category
   */
  deleteImageFromCategory: (categoryId: string): void => {
    const images = imageService.getStoredImages();
    delete images[categoryId];
    localStorage.setItem('categoryImages', JSON.stringify(images));
  },
};
