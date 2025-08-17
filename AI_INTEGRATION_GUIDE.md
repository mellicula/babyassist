# AI Integration Guide

This guide shows how to upgrade the mock AI chat to real AI services.

## Current Implementation

The app currently uses a mock AI service (`src/services/aiService.js`) that provides predefined responses based on keywords. This gives you a fully functional chat interface to test the UI and user experience.

## Upgrading to Real AI

### Option 1: OpenAI API (Recommended)

1. **Get an API Key**
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Create an API key

2. **Install Environment Variables**
   ```bash
   # Create .env file
   echo "REACT_APP_OPENAI_API_KEY=your_api_key_here" > .env
   ```

3. **Update the AI Service**
   ```javascript
   // In src/services/aiService.js, replace generateResponse with:
   static async generateResponse(message, childInfo = null) {
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
             content: `You are a helpful parenting assistant. The child's name is ${childInfo?.name || 'the child'}. Provide warm, supportive, and evidence-based advice. Keep responses concise (2-4 sentences).`
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
   }
   ```

### Option 2: Anthropic Claude

1. **Get an API Key**
   - Sign up at [Anthropic](https://console.anthropic.com/)
   - Create an API key

2. **Update the AI Service**
   ```javascript
   static async generateResponse(message, childInfo = null) {
     const response = await fetch('https://api.anthropic.com/v1/messages', {
       method: 'POST',
       headers: {
         'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
         'Content-Type': 'application/json',
         'anthropic-version': '2023-06-01'
       },
       body: JSON.stringify({
         model: 'claude-3-sonnet-20240229',
         max_tokens: 300,
         messages: [
           {
             role: 'user',
             content: `You are a helpful parenting assistant. The child's name is ${childInfo?.name || 'the child'}. Provide warm, supportive, and evidence-based advice. Keep responses concise (2-4 sentences).\n\nUser question: ${message}`
           }
         ]
       })
     });
     
     const data = await response.json();
     return data.content[0].text;
   }
   ```

### Option 3: Local AI with Ollama

1. **Install Ollama**
   ```bash
   # macOS
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Pull a model
   ollama pull llama2
   ```

2. **Create a Backend Proxy**
   ```javascript
   // Create a simple Express server to proxy to Ollama
   const express = require('express');
   const app = express();
   
   app.post('/api/chat', async (req, res) => {
     const response = await fetch('http://localhost:11434/api/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         model: 'llama2',
         prompt: req.body.message,
         stream: false
       })
     });
     
     const data = await response.json();
     res.json({ response: data.response });
   });
   ```

## Testing the Integration

1. **Test with Mock First**: Use the current mock system to test the UI
2. **Add Real AI**: Replace the mock service with real AI
3. **Monitor Usage**: Track API calls and costs
4. **Add Error Handling**: Handle API failures gracefully

## Security Considerations

- **Never expose API keys** in client-side code
- **Use a backend proxy** for production apps
- **Implement rate limiting** to control costs
- **Add user authentication** before allowing AI access

## Cost Optimization

- **Use appropriate models** (GPT-3.5-turbo is cheaper than GPT-4)
- **Limit response length** with max_tokens
- **Cache common responses** for frequently asked questions
- **Implement usage limits** per user

## Example Backend Implementation

```javascript
// server.js (Express backend)
const express = require('express');
const app = express();

app.post('/api/chat', async (req, res) => {
  try {
    const { message, childInfo } = req.body;
    
    // Add authentication here
    // Add rate limiting here
    
    const aiResponse = await generateAIResponse(message, childInfo);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});
```

Then update the frontend to call your backend instead of the AI service directly. 