#!/bin/bash

# OpenAI API Setup Script for Baby Assistant
# This script helps you set up your OpenAI API key securely

echo "🚀 Setting up OpenAI API for Baby Assistant..."
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    echo "   If you want to update your API key, edit the .env file manually."
    echo "   Current .env file:"
    cat .env
    echo ""
    exit 1
fi

# Check if env.example exists
if [ ! -f "env.example" ]; then
    echo "❌ env.example file not found!"
    echo "   Please make sure you're in the project root directory."
    exit 1
fi

# Copy env.example to .env
echo "📋 Creating .env file from template..."
cp env.example .env

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "🔑 Next steps:"
echo "   1. Edit the .env file: nano .env (or use your preferred editor)"
echo "   2. Replace 'your-openai-api-key-here' with your actual OpenAI API key"
echo "   3. Save the file"
echo "   4. Run 'npm run dev' to test the chat functionality"
echo ""
echo "🔒 Security note: Your .env file is automatically ignored by Git"
echo "   Your API key will never be committed to version control."
echo ""
echo "📖 For detailed instructions, see OPENAI_SETUP.md" 