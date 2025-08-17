// AI Service for handling chat responses
// This can be easily upgraded to use real AI APIs later

const MOCK_RESPONSES = {
  // General parenting advice
  'hello': "Hello! I'm here to help with your parenting journey. How can I assist you today?",
  'help': "I can help with:\n• Developmental milestones\n• Sleep advice\n• Feeding tips\n• Safety concerns\n• General parenting questions\n\nWhat would you like to know?",
  
  // Milestone related
  'milestone': "Every child develops at their own pace! Here are some general milestones to look for:\n\n• 2-3 months: Smiling, following objects with eyes\n• 4-6 months: Rolling over, sitting with support\n• 6-9 months: Crawling, babbling\n• 9-12 months: Standing, first words\n\nRemember, these are guidelines, not strict deadlines!",
  'walking': "Walking typically happens between 9-15 months. Some signs your child is getting ready:\n• Pulling up to stand\n• Cruising along furniture\n• Standing independently\n\nDon't worry if they're not walking yet - every child is different!",
  'talking': "Language development varies greatly! Here's what to expect:\n• 6-9 months: Babbling (ba-ba, ma-ma)\n• 9-12 months: First words\n• 12-18 months: 5-20 words\n• 18-24 months: 2-word phrases\n\nKeep talking to your child - it's the best way to encourage language!",
  
  // Sleep related
  'sleep': "Sleep is crucial for development! General guidelines:\n\n• Newborns: 14-17 hours (waking every 2-4 hours)\n• 4-6 months: 12-15 hours\n• 6-12 months: 11-14 hours\n• 1-2 years: 11-14 hours\n\nEstablishing a bedtime routine can help!",
  'bedtime': "A good bedtime routine might include:\n• Bath time\n• Reading a book\n• Gentle music\n• Cuddles\n• Consistent timing\n\nKeep it calm and predictable!",
  
  // Feeding related
  'feeding': "Feeding guidelines vary by age:\n\n• 0-6 months: Breast milk or formula only\n• 6+ months: Start introducing solid foods\n• 12+ months: 3 meals + 2-3 snacks\n\nAlways consult your pediatrician for specific advice!",
  'food': "When starting solids:\n• Start with single-ingredient foods\n• Wait 3-5 days between new foods\n• Watch for allergic reactions\n• Include iron-rich foods\n\nMake mealtime fun and relaxed!",
  
  // Safety related
  'safety': "Key safety tips:\n• Baby-proof your home\n• Never leave baby unattended\n• Use car seats properly\n• Keep small objects away\n• Install safety gates\n\nPrevention is the best approach!",
  
  // Development concerns
  'concerned': "It's normal to have concerns! Here are some red flags to discuss with your pediatrician:\n• Not responding to sounds by 6 months\n• Not making eye contact by 3 months\n• Not sitting by 9 months\n• Not walking by 18 months\n\nWhen in doubt, ask your doctor!",
  
  // Default response
  'default': "That's a great question! I'm here to help with your parenting journey. Could you tell me more about what you're looking for? I can help with developmental milestones, sleep, feeding, safety, and general parenting advice."
};

export class AIService {
  static async generateResponse(message, childInfo = null) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = message.toLowerCase();
    
    // Check for specific keywords and return appropriate responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return this.personalizeResponse(MOCK_RESPONSES.hello, childInfo);
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return MOCK_RESPONSES.help;
    }
    
    if (lowerMessage.includes('milestone') || lowerMessage.includes('development')) {
      return this.personalizeResponse(MOCK_RESPONSES.milestone, childInfo);
    }
    
    if (lowerMessage.includes('walk') || lowerMessage.includes('walking')) {
      return this.personalizeResponse(MOCK_RESPONSES.walking, childInfo);
    }
    
    if (lowerMessage.includes('talk') || lowerMessage.includes('speech') || lowerMessage.includes('language')) {
      return this.personalizeResponse(MOCK_RESPONSES.talking, childInfo);
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('bedtime')) {
      return this.personalizeResponse(MOCK_RESPONSES.sleep, childInfo);
    }
    
    if (lowerMessage.includes('feed') || lowerMessage.includes('food') || lowerMessage.includes('eating')) {
      return this.personalizeResponse(MOCK_RESPONSES.feeding, childInfo);
    }
    
    if (lowerMessage.includes('safe') || lowerMessage.includes('safety')) {
      return MOCK_RESPONSES.safety;
    }
    
    if (lowerMessage.includes('concern') || lowerMessage.includes('worried') || lowerMessage.includes('problem')) {
      return MOCK_RESPONSES.concerned;
    }
    
    // Default response
    return this.personalizeResponse(MOCK_RESPONSES.default, childInfo);
  }
  
  static personalizeResponse(response, childInfo) {
    if (!childInfo || !childInfo.name) {
      return response;
    }
    
    // Replace generic terms with child's name
    return response
      .replace(/your child/g, childInfo.name)
      .replace(/the child/g, childInfo.name)
      .replace(/baby/g, childInfo.name);
  }
  
  // Method to upgrade to real AI later
  static async generateRealAIResponse(message, childInfo = null) {
    // This is where you'd integrate with OpenAI, Anthropic, or other AI services
    // Example with OpenAI:
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful parenting assistant. The child's name is ${childInfo?.name || 'the child'}. Provide warm, supportive, and evidence-based advice.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    */
    
    // For now, fall back to mock responses
    return this.generateResponse(message, childInfo);
  }
} 