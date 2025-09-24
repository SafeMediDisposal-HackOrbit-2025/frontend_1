import { useState, useCallback } from 'react';

interface ImageUploadState {
  isUploading: boolean;
  error: string | null;
  uploadedUrl: string | null;
}

export function useImageUpload() {
  const [state, setState] = useState<ImageUploadState>({
    isUploading: false,
    error: null,
    uploadedUrl: null,
  });

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    setState(prev => ({ ...prev, isUploading: true, error: null }));

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('Image size must be less than 5MB');
      }

      // Create a data URL for immediate display
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          setState(prev => ({ 
            ...prev, 
            isUploading: false, 
            uploadedUrl: dataUrl 
          }));
          resolve(dataUrl);
        };
        reader.onerror = () => {
          const error = 'Failed to read image file';
          setState(prev => ({ 
            ...prev, 
            isUploading: false, 
            error 
          }));
          reject(new Error(error));
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setState(prev => ({ 
        ...prev, 
        isUploading: false, 
        error: errorMessage 
      }));
      return null;
    }
  }, []);

  const selectImageFromDevice = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const result = await uploadImage(file);
          resolve(result);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  }, [uploadImage]);

  const captureFromCamera = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const result = await uploadImage(file);
          resolve(result);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  }, [uploadImage]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    state,
    uploadImage,
    selectImageFromDevice,
    captureFromCamera,
    clearError,
  };
}
