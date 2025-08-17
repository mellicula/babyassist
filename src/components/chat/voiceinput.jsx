import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send } from "lucide-react";

export default function VoiceInput({ onSend, currentMessage, setCurrentMessage, disabled }) {
  
  const handleSend = () => {
    if (currentMessage.trim()) {
      onSend(currentMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 rounded-full border-2 border-gray-200 focus:border-indigo-400 px-4 py-3"
      />
      <Button
        onClick={handleSend}
        disabled={!currentMessage.trim() || disabled}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full w-14 h-14 flex items-center justify-center"
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
}
