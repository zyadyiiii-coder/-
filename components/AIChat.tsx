import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: '你好！我是译道佳华的智能助手。有什么可以帮您？\n(Hi! How can I help you today?)' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const response = await generateAIResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-40 bg-brand-red text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full md:w-96 h-[60vh] md:h-[500px] bg-white shadow-2xl z-50 rounded-t-2xl md:rounded-2xl md:bottom-24 md:right-4 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-brand-red text-white p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold">智能助手 (AI Assistant)</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex mb-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-brand-red text-white rounded-tr-none' : 'bg-white border text-gray-800 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                 <div className="bg-white border p-3 rounded-lg text-sm rounded-tl-none flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-75">.</span>
                    <span className="animate-bounce delay-150">.</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="请输入您的问题..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-red"
            />
            <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-brand-red text-white p-2 rounded-full disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};