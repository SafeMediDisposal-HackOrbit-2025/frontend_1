import { useState, useCallback } from 'react';

interface WasteAnalysisResult {
  type: string;
  confidence: number;
  price: number;
  description: string;
  category: 'medical' | 'plastic' | 'glass' | 'metal' | 'organic' | 'hazardous';
}

interface AnalysisState {
  isAnalyzing: boolean;
  result: WasteAnalysisResult | null;
  error: string | null;
}

// Mock waste detection for demonstration
const WASTE_TYPES = [
  {
    type: 'Plastic Syringes',
    confidence: 0.92,
    price: 0.5395,
    description: 'Medical plastic syringes detected',
    category: 'medical' as const
  },
  {
    type: 'Rubber Gloves',
    confidence: 0.88,
    price: 5.665,
    description: 'Medical examination gloves',
    category: 'medical' as const
  },
  {
    type: 'Glass Vials',
    confidence: 0.85,
    price: 2.34,
    description: 'Medical glass containers',
    category: 'glass' as const
  },
  {
    type: 'Plastic Bottles',
    confidence: 0.79,
    price: 1.25,
    description: 'Pharmaceutical plastic containers',
    category: 'plastic' as const
  },
  {
    type: 'Metal Instruments',
    confidence: 0.94,
    price: 8.50,
    description: 'Surgical metal tools',
    category: 'metal' as const
  }
];

export function useImageAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    result: null,
    error: null
  });

  const analyzeImage = useCallback(async (_imageData: string): Promise<WasteAnalysisResult | null> => {
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock analysis - in real app, this would call an AI service
      const randomResult = WASTE_TYPES[Math.floor(Math.random() * WASTE_TYPES.length)];
      
      // Add some randomness to confidence and price
      const result: WasteAnalysisResult = {
        ...randomResult,
        confidence: Math.max(0.7, randomResult.confidence + (Math.random() - 0.5) * 0.2),
        price: randomResult.price * (1 + (Math.random() - 0.5) * 0.3)
      };

      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        result
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: errorMessage
      }));
      return null;
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setState({
      isAnalyzing: false,
      result: null,
      error: null
    });
  }, []);

  return {
    state,
    analyzeImage,
    resetAnalysis
  };
}
