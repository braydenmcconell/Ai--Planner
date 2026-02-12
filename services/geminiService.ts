
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY! });
  }

  async processRequest(prompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reasoning_process: {
                type: Type.OBJECT,
                properties: {
                  extracted_information: {
                    type: Type.OBJECT,
                    properties: {
                      activity: { type: Type.STRING },
                      target_date: { type: Type.STRING },
                      target_time_window: { type: Type.STRING },
                      priority: { type: Type.STRING }
                    }
                  },
                  intent_analysis: { type: Type.STRING },
                  scheduling_considerations: { type: Type.STRING }
                }
              },
              action_plan: {
                type: Type.OBJECT,
                properties: {
                  primary_action: { type: Type.STRING },
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      time: { type: Type.STRING },
                      priority: { type: Type.STRING },
                      duration: { type: Type.NUMBER },
                      dueDate: { type: Type.STRING }
                    }
                  },
                  reasoning: { type: Type.STRING },
                  user_response: { type: Type.STRING },
                  additional_suggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const gemini = new GeminiService();
