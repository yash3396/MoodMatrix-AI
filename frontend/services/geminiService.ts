import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// Get API key from environment
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

let ai: GoogleGenAI | null = null;

// Initialize the AI client
try {
  if (API_KEY && API_KEY !== 'your_api_key_here') {
    ai = new GoogleGenAI({ apiKey: API_KEY });
    console.log('✅ Gemini AI initialized successfully');
  } else {
    console.error('❌ Gemini API key is missing or invalid');
  }
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI:', error);
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    sentimentScore: {
      type: Type.NUMBER,
      description: "A numerical score from 1 (very negative) to 10 (very positive) representing the overall mood of the entry."
    },
    emotions: {
      type: Type.ARRAY,
      description: "An array of up to 5 strings representing the dominant emotions detected in the text, e.g., 'Sadness', 'Anxiety', 'Hope'.",
      items: { type: Type.STRING }
    },
    summary: {
      type: Type.STRING,
      description: "A concise, gentle, and empathetic one-sentence summary of the user's expressed feelings."
    },
    suggestions: {
      type: Type.ARRAY,
      description: "An array of 3 actionable, personalized, and supportive self-care tips based on the entry's content.",
      items: { type: Type.STRING }
    }
  },
  required: ["sentimentScore", "emotions", "summary", "suggestions"]
};

export const analyzeDiaryEntry = async (text: string): Promise<AnalysisResult> => {
  if (!ai) {
    console.error("❌ Gemini AI not initialized. API key:", API_KEY ? 'Present (masked)' : 'Missing');
    throw new Error("AI service is not configured. Please check your API Key.");
  }

  try {
    console.log('🔄 Sending request to Gemini API...');
    
    const prompt = `Analyze the following diary entry for its emotional content. The user is looking for support and understanding. Provide a sentiment score, identify dominant emotions, write a gentle summary, and suggest personalized self-care tips. The entry is: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7,
      }
    });

    console.log('✅ Received response from Gemini API');
    
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    if (
        typeof parsedJson.sentimentScore !== 'number' ||
        !Array.isArray(parsedJson.emotions) ||
        typeof parsedJson.summary !== 'string' ||
        !Array.isArray(parsedJson.suggestions)
    ) {
        console.error('❌ Invalid response format:', parsedJson);
        throw new Error("API response does not match the expected format.");
    }
    
    console.log('✅ Analysis completed successfully');
    return parsedJson as AnalysisResult;

  } catch (error: any) {
    console.error("❌ Error analyzing diary entry:", error);
    console.error("Error details:", {
      message: error?.message,
      status: error?.status,
      code: error?.code
    });
    
    // Handle specific error types
    if (error?.message?.includes('quota') || error?.status === 429) {
      throw new Error("AI analysis temporarily unavailable due to API quota limits. Your entry has been saved.");
    }
    
    if (error?.message?.includes('API key') || error?.status === 401 || error?.status === 403) {
      throw new Error("Invalid API key. Please check your Gemini API configuration.");
    }
    
    throw new Error("Failed to get analysis from the AI model. Your entry has been saved without AI insights.");
  }
};