import { GoogleGenAI } from "@google/genai";
import { FULL_CONTEXT } from '../content';

// Initialize the API
// Note: In a real production app, ensure API_KEY is handled securely.
// For this frontend-only demo, we use the env variable.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (userQuestion: string): Promise<string> => {
  if (!apiKey) {
    return "请配置 API Key 以使用智能助手功能。(Please configure API Key)";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
            role: 'user',
            parts: [
                {
                    text: `You are a helpful customer service assistant for a company called "译道佳华" (YIDAOJIAHUA). 
                    Here is the company portfolio context: ${FULL_CONTEXT}.
                    
                    The user asks: "${userQuestion}"
                    
                    Answer politely and concisely in Chinese. If the question is about contact info, emphasize calling the phone numbers.
                    Do not make up facts not in the context.`
                }
            ]
        }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "抱歉，我暂时无法回答这个问题，请直接致电我们。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "智能助手连接失败，请稍后再试或直接拨打电话。";
  }
};