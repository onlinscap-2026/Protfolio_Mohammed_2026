
import { GoogleGenAI } from "@google/genai";
// Fix: Import PortfolioData type and use it to build context dynamically
import { PortfolioData } from "../types";

const getSystemInstruction = (data: PortfolioData) => {
  // Fix: Extract profile data from the provided data object
  const { bio: BIO, projects: PROJECTS, skills: SKILLS, experience: EXPERIENCE } = data;
  
  const context = `
    You are the AI Assistant for ${BIO.name}, a ${BIO.title}.
    Your goal is to answer questions about Alex's professional background, skills, and projects based on the provided context.
    
    About: ${BIO.about}
    
    Skills:
    ${SKILLS.map(s => `- ${s.name} (${s.level}%)`).join('\n')}
    
    Projects:
    ${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}
    
    Experience:
    ${EXPERIENCE.map(e => `- ${e.role} at ${e.company} at ${e.location} (${e.period})`).join('\n')}
    
    Keep your answers professional, concise, and helpful. If asked something outside this context, politely steer the conversation back to Alex's work.
  `;
  return context;
};

// Fix: Update function to accept portfolio data as context
export const generateAIResponse = async (userPrompt: string, data: PortfolioData) => {
  try {
    // Correct initialization: always use a named parameter and direct process.env.API_KEY access
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: getSystemInstruction(data),
        temperature: 0.7,
        // maxOutputTokens is omitted to avoid blocking output due to thinking budget constraints
      },
    });

    // Access the text property directly from the response object
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my AI brain right now. Try again later!";
  }
};
