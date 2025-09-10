
import { GoogleGenAI, Type } from "@google/genai";
import type { StoryboardScene } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyboardSchema = {
  type: Type.OBJECT,
  properties: {
    scenes: {
      type: Type.ARRAY,
      description: "An array of storyboard scenes.",
      items: {
        type: Type.OBJECT,
        properties: {
          scene_number: {
            type: Type.INTEGER,
            description: "The sequential number of the scene.",
          },
          title: {
            type: Type.STRING,
            description: "A short, evocative title for the scene.",
          },
          description: {
            type: Type.STRING,
            description: "A detailed description of the action, dialogue, and events in the scene.",
          },
          visual_suggestion: {
            type: Type.STRING,
            description: "Suggestions for camera angles, lighting, character expressions, and overall visual composition.",
          },
        },
        required: ["scene_number", "title", "description", "visual_suggestion"],
      },
    },
  },
  required: ["scenes"],
};

export const generateStoryboard = async (prompt: string): Promise<StoryboardScene[]> => {
  const fullPrompt = `
    Generate a detailed storyboard with 5-7 scenes based on the following idea.
    For each scene, provide a scene number, a short title, a detailed description of the action, and a specific visual suggestion (camera shots, lighting, etc.).
    Idea: "${prompt}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: storyboardSchema,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const jsonText = response.text;
    const parsedJson = JSON.parse(jsonText);

    if (parsedJson && parsedJson.scenes && Array.isArray(parsedJson.scenes)) {
       return parsedJson.scenes as StoryboardScene[];
    } else {
        console.error("Unexpected JSON structure:", parsedJson);
        throw new Error("Failed to parse storyboard scenes from AI response.");
    }

  } catch (error) {
    console.error("Error generating storyboard:", error);
    throw new Error("The AI model failed to generate a valid response.");
  }
};
