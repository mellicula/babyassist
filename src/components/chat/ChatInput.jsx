import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';

/**
 * Chat Input Component
 * 
 * Provides a text input field and send button for chat messages.
 * Handles message submission and provides visual feedback during typing.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSendMessage - Callback function when message is sent
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {string} [props.placeholder="Type your message..."] - Placeholder text
 */
export default function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message..." 
}) {
  const [message, setMessage] = useState('');

  /**
   * Handles form submission and sends the message
   * 
   * @function handleSubmit
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  /**
   * Handles key press events for Enter key submission
   * 
   * @function handleKeyPress
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 rounded-full border-2 border-gray-200 focus:border-indigo-400 px-4 py-3"
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="rounded-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
} 