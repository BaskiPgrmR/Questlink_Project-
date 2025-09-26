// This service handles all interactions with the Gemini API.

const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

/**
 * Generates a comprehensive quest blueprint using the Gemini API.
 * @param {string} userGoal - The user's specific goal (e.g., "learn and complete HTML").
 * @returns {Promise<object>} The structured quest blueprint.
 */
const generateUnifiedQuestBlueprint = async (userGoal) => {
  const prompt = `Act as an AI Dungeon Master who specializes in creating educational quests. A user wants to achieve the following goal: "${userGoal}". Your task is to generate a comprehensive quest blueprint in a JSON object format.

  The blueprint must contain the following keys:
  - questTitle: A creative and thematic title for the quest.
  - narrativeHook: A short, engaging story to start the quest.
  - chapters: An array of objects, where each object represents a dungeon level or a major milestone.
  - bossLevel: An object defining the final boss battle.
  - finalEnding: A powerful, gamified narrative conclusion.

  Each chapter object in the 'chapters' array must contain:
  - chapterTitle: The title of the chapter (e.g., "The Labyrinth of Tags").
  - challenges: An array of 3-4 challenge objects. Each challenge object must contain a unique 'question', a 'type' (either 'multiple-choice' or 'subjective'), a 'correctAnswer' (for multiple-choice questions), and 'options' (an array of 4 strings for multiple-choice).
  - xpAward: The amount of XP gained upon completing all challenges in the chapter.
  - accessoryAward: The name of a unique accessory awarded upon completion.

  The 'bossLevel' object must define a final challenge that tests all skills learned.
  The 'finalEnding' narrative must be epic and explicitly reference the accessories earned to defeat the boss. For example, "You used the [Tablet of Tags] to decipher the final command..."

  Please ensure all content (narrative, titles, questions, and answers) is relevant to the user's goal and is unique to this generation. Format the entire response as a single, well-formed JSON object.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          questTitle: { type: "STRING" },
          narrativeHook: { type: "STRING" },
          chapters: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                chapterTitle: { type: "STRING" },
                challenges: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      question: { type: "STRING" },
                      type: { type: "STRING", enum: ["multiple-choice", "subjective"] },
                      options: { type: "ARRAY", items: { type: "STRING" } },
                      correctAnswer: { type: "STRING" }
                    },
                    required: ["question", "type"]
                  }
                },
                xpAward: { type: "INTEGER" },
                accessoryAward: { type: "STRING" }
              },
              required: ["chapterTitle", "challenges", "xpAward", "accessoryAward"]
            }
          },
          bossLevel: {
            type: "OBJECT",
            properties: {
              bossName: { type: "STRING" },
              challengeDescription: { type: "STRING" }
            }
          },
          finalEnding: { type: "STRING" }
        }
      }
    }
  };

  try {
    const response = await axios.post(API_URL, payload);
    const jsonText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (jsonText) {
      return JSON.parse(jsonText);
    } else {
      throw new Error('No content returned from Gemini API.');
    }
  } catch (error) {
    console.error('Error generating quest blueprint:', error);
    throw error;
  }
};

module.exports = { generateUnifiedQuestBlueprint };