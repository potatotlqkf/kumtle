import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  async generateCharacterAndBackground(nickname: string, dream: string) {
    const prompt = `A baby's nickname is "${nickname}" and the mother's dream was about "${dream}". 
    Create a cute, soft-style character description and a peaceful background description for an app for expectant mothers.
    The character should be evolved from the nickname and dream.
    
    Return in JSON format:
    {
      "characterDescription": "detailed visual description of the character",
      "backgroundDescription": "detailed visual description of the "Kkumteul Maru" (living space)",
      "characterImagePrompt": "detailed prompt to generate this character in a soft, watercolor, 2D art style",
      "backgroundImagePrompt": "detailed prompt to generate this background in a soft, watercolor, 2D art style"
    }`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              characterDescription: { type: Type.STRING },
              backgroundDescription: { type: Type.STRING },
              characterImagePrompt: { type: Type.STRING },
              backgroundImagePrompt: { type: Type.STRING },
            }
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  },

  async getBabyCommentForDiary(diaryContent: string, nickname: string) {
    const prompt = `The mother wrote a diary entry: "${diaryContent}". 
    As the baby (nickname: ${nickname}), write a heartwarming, 1-2 sentence response to your mother. Use a cute, soft tone in Korean. 
    Wrap it in a JSON object with key "comment".`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              comment: { type: Type.STRING }
            }
          }
        }
      });
      return JSON.parse(response.text || "{}").comment;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "엄마의 마음이 느껴져요. 사랑해요!";
    }
  },

  async getBabyQuestion(nickname: string) {
    const prompt = `As the fetus (nickname: ${nickname}), ask a curious, sweet question to your mother to encourage her to write a diary entry.
    Example: "엄마, 오늘은 뭐 먹었어요?", "엄마, 오늘 기분은 어때요?"
    Return a 1-sentence question in Korean in a JSON object with key "question".`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING }
            }
          }
        }
      });
      return JSON.parse(response.text || "{}").question;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "엄마, 오늘 하루는 어떠셨나요?";
    }
  },

  async generateImageUrl(prompt: string, week: number = 1) {
    const growthStage = week < 12 ? "seedling/early stage" : week < 28 ? "developing/middle stage" : "fully grown/late stage";
    const enhancedPrompt = `${prompt}. Growth stage: ${growthStage}. Soft pastel colors, children's book illustration style, 2D art.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: enhancedPrompt }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    } catch (error) {
      console.error("Image Gen Error:", error);
    }
    // Fallback to a placeholder related to the prompt
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/800`;
  }
};
