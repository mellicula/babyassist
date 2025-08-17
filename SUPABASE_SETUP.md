# Supabase Setup Guide for RAG System

## 🚀 **What You're Getting**

With Supabase integration, your Baby Assistant now has:

- ✅ **RAG (Retrieval-Augmented Generation)** - AI responses enhanced with authoritative parenting documents
- ✅ **Document Storage** - Parenting resources stored in a real database
- ✅ **Context-Aware Responses** - AI considers your child's age and development stage
- ✅ **Source Attribution** - Every response includes links to authoritative sources
- ✅ **Scalable Architecture** - Easy to add more documents and improve responses

## 🔑 **Getting Your Supabase Credentials**

### **Step 1: Create/Login to Supabase**
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a new account
3. Create a new project or select an existing one

### **Step 2: Get Your Credentials**
1. **Go to Project Settings** → **API**
2. **Copy the Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
3. **Copy the anon/public key** (starts with `eyJ...`)

## ⚙️ **Configuration Steps**

### **Step 1: Update Your .env File**
Add these lines to your `.env` file:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Step 2: Create the Database Table**
Run this SQL in your Supabase SQL Editor:

```sql
-- Create documents table for RAG system
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  age_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_age_range ON documents(age_range);
CREATE INDEX idx_documents_created_at ON documents(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON documents
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON documents
  FOR INSERT WITH AUTHENTICATION (true);
```

### **Step 3: Test the Setup**
1. **Start your app**: `npm run dev`
2. **Add a child** on the home page
3. **Go to chat** and ask a parenting question
4. **Check the console** for any Supabase connection errors

## 📚 **How RAG Works in Your App**

### **1. User Asks a Question**
```
User: "How can I help my 6-month-old sleep better?"
```

### **2. RAG System Retrieves Relevant Documents**
- Searches for documents about "sleep" and "6 months"
- Finds relevant parenting resources
- Creates context for the AI

### **3. AI Generates Enhanced Response**
- Uses retrieved documents as context
- Provides evidence-based advice
- Cites authoritative sources

### **4. User Gets Informed Response**
```
AI: "Based on authoritative sources, here are sleep tips for 6-month-olds:
• Establish a consistent bedtime routine
• Put baby down drowsy but awake
• Consider sleep training methods

Sources: Baby Development 6-9 Months, Safe Sleep Guidelines"
```

## 🔧 **Adding More Documents**

### **Manual Addition via Supabase Dashboard**
1. Go to **Table Editor** → **documents**
2. Click **Insert Row**
3. Fill in the details:
   - **title**: "Your Document Title"
   - **url**: "https://source-url.com"
   - **content**: "Document content or summary"
   - **category**: "development", "health", "feeding", "safety"
   - **age_range**: "0-3 months", "6-9 months", etc.

### **Programmatic Addition**
Use the `storeDocument` function in your RAG service:

```javascript
import { storeDocument } from '../services/ragService';

const newDoc = {
  title: "New Parenting Resource",
  url: "https://example.com",
  content: "Document content...",
  category: "development",
  age_range: "0-6 months"
};

await storeDocument(newDoc);
```

## 🧪 **Testing Your RAG System**

### **Test Questions to Try**
1. **"What milestones should I expect at 6 months?"**
2. **"How can I establish a bedtime routine?"**
3. **"What foods are safe to start at 8 months?"**
4. **"How much sleep does a 1-year-old need?"**

### **Expected Behavior**
- ✅ **Relevant responses** based on your child's age
- ✅ **Source citations** with document titles and URLs
- ✅ **Context-aware advice** using authoritative resources
- ✅ **Fast responses** with enhanced AI context

## 🐛 **Troubleshooting**

### **"Supabase credentials not found" warning**
- Check your `.env` file has the correct variables
- Ensure variable names start with `VITE_`
- Restart your development server after changes

### **"Table doesn't exist" error**
- Run the SQL commands in Supabase SQL Editor
- Check the table name is exactly `documents`
- Verify RLS policies are enabled

### **"Permission denied" error**
- Check RLS policies in Supabase
- Ensure the `documents` table allows public read access
- Verify your anon key is correct

### **Slow responses**
- Check Supabase connection in browser console
- Verify your Supabase project is in the same region
- Consider adding more indexes for better performance

## 🚀 **Next Steps**

### **Immediate Benefits**
- Your chat now provides evidence-based parenting advice
- Responses include authoritative sources
- Age-appropriate recommendations for your child

### **Future Enhancements**
- **Vector embeddings** for semantic search
- **Document ingestion** from PDFs and websites
- **User feedback** to improve document relevance
- **Analytics** on which resources are most helpful

## 🔒 **Security Features**

✅ **Row Level Security (RLS)** enabled  
✅ **Public read access** for documents  
✅ **Authenticated insert** for admins  
✅ **Environment variables** for credentials  
✅ **No sensitive data** in client code  

Your RAG system is now ready to provide intelligent, evidence-based parenting advice! 🎉 