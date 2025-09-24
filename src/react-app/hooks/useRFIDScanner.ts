import { useEffect, useRef, useState, useCallback } from 'react';

interface RFIDScannerState {
  isActive: boolean;
  hasPermission: boolean;
  error: string | null;
  isLoading: boolean;
  result: string | null;
  isConnected: boolean;
}

export function useRFIDScanner() {
  const readerRef = useRef<any>(null);
  const [state, setState] = useState<RFIDScannerState>({
    isActive: false,
    hasPermission: false,
    error: null,
    isLoading: false,
    result: null,
    isConnected: false,
  });

  const startScanning = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null, result: null }));

    try {
      // Check if Web NFC is supported
      if (!('NDEFReader' in window)) {
        throw new Error('NFC is not supported by this browser. Please use Chrome on Android or a compatible device.');
      }

      // Request NFC permission
      console.log('Requesting NFC access...');
      const ndefReader = new (window as any).NDEFReader();
      readerRef.current = ndefReader;

      await ndefReader.scan();
      
      setState(prev => ({
        ...prev,
        isActive: true,
        hasPermission: true,
        isLoading: false,
        isConnected: true
      }));

      // Listen for NFC tags
      ndefReader.addEventListener('reading', (event: any) => {
        console.log('RFID tag detected:', event);
        
        // Extract data from the RFID tag
        let tagData = '';
        
        if (event.serialNumber) {
          tagData = `Serial: ${event.serialNumber}`;
        }
        
        if (event.message && event.message.records) {
          for (const record of event.message.records) {
            if (record.recordType === 'text') {
              const textDecoder = new TextDecoder(record.encoding || 'utf-8');
              const text = textDecoder.decode(record.data);
              tagData += tagData ? ` | Data: ${text}` : `Data: ${text}`;
            } else if (record.recordType === 'url') {
              const url = new TextDecoder().decode(record.data);
              tagData += tagData ? ` | URL: ${url}` : `URL: ${url}`;
            }
          }
        }

        if (!tagData && event.serialNumber) {
          tagData = `RFID Tag ID: ${event.serialNumber}`;
        } else if (!tagData) {
          tagData = 'RFID Tag Detected (No readable data)';
        }

        setState(prev => ({
          ...prev,
          result: tagData
        }));
      });

      ndefReader.addEventListener('readingerror', (event: any) => {
        console.error('RFID reading error:', event);
        setState(prev => ({
          ...prev,
          error: 'Error reading RFID tag. Please try again.'
        }));
      });

    } catch (error) {
      console.error('RFID Scanner error:', error);
      let errorMessage = 'Failed to start RFID scanner';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'NFC permission denied. Please allow NFC access in your browser settings.';
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'NFC is not supported on this device or browser.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'NFC is not available. Please enable NFC in your device settings.';
        } else {
          errorMessage = error.message;
        }
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        isActive: false,
        isConnected: false
      }));
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (readerRef.current) {
      try {
        // Note: Web NFC API doesn't have a stop method, 
        // but we can remove event listeners
        readerRef.current.removeEventListener('reading', () => {});
        readerRef.current.removeEventListener('readingerror', () => {});
        readerRef.current = null;
      } catch (error) {
        console.error('Error stopping RFID scanner:', error);
      }
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      isLoading: false,
      isConnected: false
    }));
  }, []);

  const resetResult = useCallback(() => {
    setState(prev => ({
      ...prev,
      result: null
    }));
  }, []);

  // Simulate RFID scanning for development/testing purposes
  const simulateRFIDScan = useCallback(() => {
    if (!state.isActive) return;
    
    const simulatedTags = [
      'RFID Tag ID: A1B2C3D4E5F6',
      'Serial: 1234567890 | Data: Waste Container #001',
      'Data: Staff ID: EMP001 | Name: John Doe',
      'URL: https://hospital.com/equipment/12345',
      'Serial: 9876543210 | Data: Medical Equipment #456'
    ];
    
    const randomTag = simulatedTags[Math.floor(Math.random() * simulatedTags.length)];
    
    setState(prev => ({
      ...prev,
      result: randomTag
    }));
  }, [state.isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    state,
    startScanning,
    stopScanning,
    resetResult,
    simulateRFIDScan
  };
}
