import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 glass-effect rounded-3xl">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 rounded-full border-2 border-gray-200 focus:border-indigo-400 px-4 py-3"
        disabled={disabled}
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="rounded-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
} 