import { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

interface QRScannerState {
  isActive: boolean;
  hasPermission: boolean;
  error: string | null;
  isLoading: boolean;
  result: string | null;
}

export function useQRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);
  const [state, setState] = useState<QRScannerState>({
    isActive: false,
    hasPermission: false,
    error: null,
    isLoading: false,
    result: null,
  });

  const startScanning = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null, result: null }));

    try {
      // Check if camera is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported by this browser');
      }

      // Initialize QR code reader
      readerRef.current = new BrowserQRCodeReader();

      // Request camera permission and get stream
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      console.log('Requesting camera access for QR scanning...');
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to load metadata
        videoRef.current.onloadedmetadata = async () => {
          console.log('QR Scanner camera loaded successfully');
          setState(prev => ({
            ...prev,
            isActive: true,
            hasPermission: true,
            isLoading: false
          }));

          // Start QR code detection
          if (readerRef.current && videoRef.current) {
            try {
              await readerRef.current.decodeFromVideoDevice(
                null,
                videoRef.current,
                (result) => {
                  if (result) {
                    console.log('QR Code detected:', result.getText());
                    setState(prev => ({
                      ...prev,
                      result: result.getText()
                    }));
                  }
                }
              );
            } catch (scanError) {
              console.error('QR scanning error:', scanError);
            }
          }
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
      console.error('QR Scanner camera access error:', error);
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

  const stopScanning = useCallback(() => {
    // Stop QR code reader
    if (readerRef.current) {
      readerRef.current.reset();
      readerRef.current = null;
    }

    // Stop camera stream
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

  const resetResult = useCallback(() => {
    setState(prev => ({
      ...prev,
      result: null
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    videoRef,
    state,
    startScanning,
    stopScanning,
    resetResult
  };
}
