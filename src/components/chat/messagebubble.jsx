import React from 'react';
import { format } from 'date-fns';
import { Baby, User } from 'lucide-react';

export default function MessageBubble({ message, isParent }) {
  return (
    <div className={`flex gap-3 ${isParent ? 'justify-end' : 'justify-start'}`}>
      {!isParent && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center flex-shrink-0">
          <Baby className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[85%] ${isParent ? 'order-first' : ''}`}>
        <div className={`p-3 rounded-2xl ${
          isParent 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md' 
            : 'glass-effect text-gray-800 rounded-bl-md'
        }`}>
          {/* Parse and format AI responses with follow-up questions */}
          {!isParent && message.content.includes('Follow-up questions:') ? (
            <div className="space-y-2">
              {/* Answer section */}
              <div className="text-sm leading-relaxed">
                {message.content.split('Follow-up questions:')[0].replace('Answer:', '').trim()}
              </div>
              
              {/* Follow-up questions */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-600 mb-2">Suggested follow-ups:</p>
                <div className="space-y-1">
                  {message.content
                    .split('Follow-up questions:')[1]
                    .split('•')
                    .filter(q => q.trim())
                    .map((question, index) => (
                      <button
                        key={index}
                        className="block text-xs text-blue-600 hover:text-blue-800 text-left w-full p-1 rounded hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          // Trigger a new message with the follow-up question
                          const event = new CustomEvent('followUpQuestion', {
                            detail: { question: question.trim() }
                          });
                          window.dispatchEvent(event);
                        }}
                      >
                        {question.trim()}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          )}
          
          {/* Display sources for AI messages */}
          {!isParent && message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-1">Sources:</p>
              <div className="space-y-1">
                {message.sources.map((source, index) => (
                  <div key={index} className="text-xs text-gray-500">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {source.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className={`text-xs text-gray-400 mt-1 px-2 ${isParent ? 'text-right' : 'text-left'}`}>
          {message.timestamp && format(new Date(message.timestamp), 'h:mm a')}
        </p>
      </div>
      
      {isParent && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
