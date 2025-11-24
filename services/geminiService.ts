import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askGeminiStrategy = async (strategyName: string, btcPrice: number, promptText: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your environment variables.";
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `You are a world-class financial derivative expert specialized in Bitcoin Options. 
  You explain concepts clearly, concisely, and use markdown for formatting. 
  The current context is: Strategy = ${strategyName}, Reference BTC Price = $${btcPrice}.
  Focus on practical risks, Greeks (Delta, Theta, Vega), and when to use this strategy.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while consulting the strategy advisor.";
  }
};