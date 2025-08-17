/**
 * AI Service for OpenAI Integration
 * 
 * This service handles communication with OpenAI's API to provide
 * intelligent responses for parenting questions and child development advice.
 * 
 * @service
 * @description OpenAI-powered AI assistant for parenting guidance
 */

/**
 * Configuration for OpenAI API
 * 
 * IMPORTANT: Store your API key in a .env file (see .env.example)
 * Never commit your actual API key to version control
 */
const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
  maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS) || 500,
  temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE) || 0.7
};

/**
 * Sends a message to OpenAI and returns the AI response
 * 
 * @async
 * @function sendMessageToAI
 * @param {string} message - The user's message/question
 * @param {Object} childInfo - Information about the child for context
 * @returns {Promise<Object>} AI response with message and sources
 * 
 * @example
 * const response = await sendMessageToAI(
 *   "How can I help my 6-month-old sleep better?",
 *   { name: "Emma", age: "6 months" }
 * );
 */
export async function sendMessageToAI(message, childInfo = null) {
  // Check if API key is configured
  if (!OPENAI_CONFIG.apiKey) {
    throw new Error('OpenAI API key not configured. Please check your .env file.');
  }

  try {
    // Prepare the context for the AI
    const systemPrompt = createSystemPrompt(childInfo);
    const userPrompt = message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: OPENAI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: OPENAI_CONFIG.maxTokens,
        temperature: OPENAI_CONFIG.temperature
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return {
      response: aiMessage,
      sources: [], // OpenAI doesn't provide sources, but we could add them later
      model: OPENAI_CONFIG.model
    };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Unable to get AI response. Please check your API key and try again.');
  }
}

/**
 * Creates a system prompt for the AI based on child information
 * 
 * @function createSystemPrompt
 * @param {Object} childInfo - Information about the child
 * @returns {string} System prompt for the AI
 */
function createSystemPrompt(childInfo) {
  let prompt = `You are a knowledgeable and caring parenting assistant. Your role is to provide helpful, 
  evidence-based advice about child development, parenting, and family life. Always be supportive, 
  encouraging, and practical in your responses.`;

  if (childInfo) {
    prompt += `\n\nYou are currently helping with a child named ${childInfo.name}`;
    
    if (childInfo.age) {
      prompt += ` who is ${childInfo.age} old.`;
    }
    
    prompt += `\n\nWhen providing advice, consider the child's age and development stage. 
    Focus on age-appropriate suggestions and milestones.`;
  }

  prompt += `\n\nImportant guidelines:
  - Provide practical, actionable advice
  - Be encouraging and supportive
  - Mention when professional help might be needed
  - Keep responses concise but helpful
  - Use a warm, friendly tone`;

  return prompt;
}

/**
 * Generates a welcome message for new chat sessions
 * 
 * @function generateWelcomeMessage
 * @param {Object} childInfo - Information about the child
 * @returns {string} Personalized welcome message
 */
export function generateWelcomeMessage(childInfo) {
  if (!childInfo) {
    return "Hello! I'm your AI parenting assistant. Ask me anything about child development, sleep, feeding, or safety. I'll keep answers concise and suggest helpful follow-up questions.";
  }

  return `Hi! I'm here to help with ${childInfo.name}'s development. Ask me about milestones, sleep, feeding, or safety. I'll give you focused answers and suggest what to ask next.`;
} 