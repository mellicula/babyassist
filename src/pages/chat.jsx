
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Child } from '../entities/Child';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { sendMessageToAI, generateWelcomeMessage } from '../services/aiService';
import { retrieveRelevantDocuments, generateContextAwareResponse } from '../services/ragService';
import MessageBubble from '../components/chat/messagebubble';
import TypingIndicator from '../components/chat/typingindicator';
import ChatInput from '../components/chat/ChatInput';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const [child, setChild] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const childId = searchParams.get('child');

  useEffect(() => {
    if (childId) {
      loadChild();
    }
  }, [childId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Listen for follow-up question clicks
    const handleFollowUpQuestion = (event) => {
      const question = event.detail.question;
      sendMessage(question);
    };

    window.addEventListener('followUpQuestion', handleFollowUpQuestion);
    
    return () => {
      window.removeEventListener('followUpQuestion', handleFollowUpQuestion);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChild = async () => {
    try {
      console.log('Loading child with ID:', childId);
      const childData = await Child.get(childId);
      console.log('Child data loaded:', childData);
      setChild(childData);

      // Send welcome message
      if (childData) {
        setTimeout(() => {
          sendWelcomeMessage(childData);
        }, 500);
      }
    } catch (error) {
      console.error('Error loading child:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendWelcomeMessage = async (childData) => {
    const welcomeMessage = {
      id: `msg-${Date.now()}`,
      content: generateWelcomeMessage(childData),
      sender: 'ai',
      timestamp: new Date().toISOString()
    };

    setMessages([welcomeMessage]);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || !child) return;

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      content: messageText.trim(),
      sender: 'parent',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Get RAG-enhanced AI response
      const relevantDocs = await retrieveRelevantDocuments(messageText, child, 3);
      const contextResponse = await generateContextAwareResponse(messageText, child, relevantDocs);
      
      // Send enhanced prompt to AI
      const aiResult = await sendMessageToAI(contextResponse.prompt, child);

      const aiMessage = {
        id: `msg-${Date.now()}`,
        content: aiResult.response,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        sources: relevantDocs.map(doc => ({
          title: doc.title,
          url: doc.url,
          category: doc.category,
          age_range: doc.age_range
        }))
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);

      const errorMessage = {
        id: `msg-${Date.now()}`,
        content: "Sorry, I'm having trouble responding right now. Please check your API key and try again.",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <div className="glass-effect rounded-3xl p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <div className="glass-effect rounded-3xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Child Not Found</h2>
          <p className="text-gray-600">The specified child could not be found.</p>
        </div>
      </div>
    );
  }

    return (
    <div className="max-w-sm mx-auto flex flex-col h-[90vh] max-h-[600px]">
      {/* Header */}
      <div className="glass-effect p-3 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="outline" size="sm" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h2 className="font-bold text-gray-800 text-sm">{child.name}</h2>
            <p className="text-xs text-gray-500">AI Parenting Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isParent={message.sender === 'parent'}
          />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-white/20">
        <ChatInput
          onSendMessage={sendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
}

