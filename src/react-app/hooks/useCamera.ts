import { useEffect, useRef, useState, useCallback } from 'react';

interface CameraState {
  isActive: boolean;
  hasPermission: boolean;
  error: string | null;
  isLoading: boolean;
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>({
    isActive: false,
    hasPermission: false,
    error: null,
    isLoading: false,
  });

  const startCamera = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if camera is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported by this browser');
      }

      // Request camera permission and get stream
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      console.log('Requesting camera access with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to load metadata
        videoRef.current.onloadedmetadata = () => {
          console.log('Camera video loaded successfully');
          setState(prev => ({
            ...prev,
            isActive: true,
            hasPermission: true,
            isLoading: false
          }));
        };
        
        // Handle video errors
        videoRef.current.onerror = (e) => {
          console.error('Video element error:', e);
          setState(prev => ({
            ...prev,
            error: 'Failed to display camera feed',
            isLoading: false
          }));
        };
      }
    } catch (error) {
      console.error('Camera access error:', error);
      let errorMessage = 'Failed to access camera';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera permission denied. Please allow camera access in your browser settings.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera found on this device.';
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'Camera not supported by this browser.';
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = 'Camera constraints not supported. Trying with default settings...';
        } else {
          errorMessage = error.message;
        }
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        isActive: false
      }));

      // If environment camera fails, try with default camera
      if (error instanceof Error && error.name === 'OverconstrainedError') {
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            streamRef.current = fallbackStream;
            setState(prev => ({
              ...prev,
              isActive: true,
              hasPermission: true,
              isLoading: false,
              error: null
            }));
          }
        } catch (fallbackError) {
          console.error('Fallback camera access failed:', fallbackError);
        }
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      isLoading: false
    }));
  }, []);

  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current || !state.isActive) return null;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    context.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }, [state.isActive]);

  const switchCamera = useCallback(async () => {
    if (!state.isActive) return;
    
    stopCamera();
    
    // Small delay to ensure camera is properly released
    setTimeout(() => {
      startCamera();
    }, 500);
  }, [state.isActive, stopCamera, startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    state,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera
  };
}
