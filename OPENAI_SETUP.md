# OpenAI API Setup Guide

## 🔑 **Getting Your API Keys**

### **OpenAI API Key**
1. **Visit OpenAI Platform**: Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Sign In**: Log in to your OpenAI account
3. **Create API Key**: Click "Create new secret key"
4. **Copy Key**: Copy the generated API key (it starts with `sk-`)

### **Supabase Credentials (for RAG system)**
1. **Go to Supabase**: [https://supabase.com](https://supabase.com)
2. **Create/Login**: Create a new project or select existing
3. **Get Credentials**: Project Settings → API → Copy URL and anon key
4. **Setup Database**: Run the SQL commands from `SUPABASE_SETUP.md`

## ⚙️ **Configuration Steps**

### **Step 1: Create Environment File**

1. **Copy the example file**: `cp env.example .env`
2. **Edit the .env file** and add your API keys:

```bash
# .env file
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=500
VITE_OPENAI_TEMPERATURE=0.7

# Supabase Configuration (for RAG system)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example:**
```bash
VITE_OPENAI_API_KEY=sk-abc123def456ghi789...
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=500
VITE_OPENAI_TEMPERATURE=0.7
```

### **Step 2: Test the Chat**

1. **Start the app**: `npm run dev`
2. **Add a child** on the home page
3. **Click "Chat with AI Assistant"** button
4. **Type a message** like "How can I help my baby sleep better?"
5. **Press Enter** or click the send button

### **Step 3: Verify Security**

✅ **Check that your API key is safe:**
- Your `.env` file should NOT appear in `git status`
- The `.env.example` file should be committed (safe template)
- Your actual API key should never appear in the code

## 🔒 **Security Best Practices**

### **✅ Secure Setup (Current Implementation)**
- **Environment variables**: API key stored in `.env` file (not in code)
- **Git protection**: `.env` files are automatically ignored by `.gitignore`
- **Safe for GitHub**: Your API key will never be committed to version control
- **Production ready**: This is the recommended approach for all environments

### **How It Works**
1. **`.env` file**: Contains your actual API key (local only)
2. **`.env.example`**: Template file that gets committed (no real keys)
3. **`.gitignore`**: Ensures `.env` files are never committed
4. **Vite integration**: Automatically loads environment variables

### **File Structure**
```
your-project/
├── .env                 ← Your real API key (NOT committed to Git)
├── .env.example        ← Template file (IS committed to Git)
├── .gitignore          ← Protects .env files
└── src/
    └── services/
        └── aiService.js ← Reads from environment variables
```

## 💰 **Cost Information**

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (very affordable)
- **Typical chat response**: 100-300 tokens
- **Cost per response**: Less than $0.001
- **Free tier**: $5 credit when you first sign up

## 🚀 **Features You'll Get**

With OpenAI integration, your chat will now:

- ✅ **Answer parenting questions** with AI-powered responses
- ✅ **Provide developmental advice** based on child's age
- ✅ **Give personalized responses** using child's name
- ✅ **Handle complex queries** about milestones, sleep, feeding, etc.
- ✅ **Maintain conversation context** throughout the chat session

## 🐛 **Troubleshooting**

### **"API key not valid" error**
- Check that you copied the entire API key
- Ensure there are no extra spaces
- Verify the key starts with `sk-`

### **"Rate limit exceeded" error**
- You've hit the API rate limit
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan

### **"Model not found" error**
- The model name might be incorrect
- Use `gpt-3.5-turbo` (most common)
- Check OpenAI's current model list

## 📱 **Testing Your Setup**

Try these example questions to test the AI:

1. **"What milestones should I expect at 6 months?"**
2. **"How can I establish a bedtime routine?"**
3. **"What foods are safe to start at 8 months?"**
4. **"How much sleep does a 1-year-old need?"**

The AI should provide helpful, personalized responses based on your child's information! 