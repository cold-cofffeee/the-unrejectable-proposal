import { GoogleGenAI, Type } from "@google/genai";
import { IQuestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateSillyQuestions = async (): Promise<IQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a JSON array of 3 unique, short, silly, and slightly annoying multiple-choice questions to ask someone you have a crush on. The questions should be fun and lighthearted. Each question object should have a \"question\" key (string) and an \"options\" key (an array of 3 strings).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'The silly question to ask.'
              },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'An array of 3 possible answers.'
              },
            },
            required: ["question", "options"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);
    return questions as IQuestion[];
  } catch (error) {
    console.error("Failed to generate silly questions:", error);
    // Return fallback questions if API fails
    return [
      { question: "What is the superior form of potato?", options: ["Mashed", "Fried", "Vodka"] },
      { question: "If you were a ghost, who would you haunt first?", options: ["My ex", "My boss", "The inventor of pop-up ads"] },
      { question: "What's the weirdest thing you've eaten for breakfast?", options: ["Cold pizza", "Leftover spaghetti", "Just coffee and regret"] },
    ];
  }
};


export const generateCelebrationPoem = async (name: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write a short, sweet, and cozy 4-line poem for someone named ${name} who just said 'yes' to going out with me. Keep it light, charming, and celebratory. Do not include any markdown or special formatting.`,
            config: {
                temperature: 0.8,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Failed to generate celebration poem:", error);
        return `Dear ${name}, so glad you said yes,\nYou've filled my life with happiness.\nLet's go on an adventure, you and me,\nThis is going to be legendary!`;
    }
};