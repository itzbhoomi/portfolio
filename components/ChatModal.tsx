'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasIntroduced, setHasIntroduced] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (!hasIntroduced) {
        setChatHistory([
          {
            role: 'ai',
            text: `Hiya! I'm Wobbly 🐼 — your friendly panda and Bhoomi's coding buddy! \nI'm here to guide you through Bhoomi's world of code, creativity, and caffeine-fueled engineering magic.
Want to learn about Bhoomi's projects? Skills? Education? Or just curious about what makes her portfolio tick?
Ask me anything I don't bite... unless you're a bug in the code.😌🌿💻`,
          },
        ]);
        setHasIntroduced(true);
      }
    } else {
      document.body.style.overflow = '';
      setHasIntroduced(false);
      setChatHistory([]);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, hasIntroduced]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', text: data.reply || 'No response received.' },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-[80vh] bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg flex flex-col relative text-white"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition"
        >
          <X />
        </button>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                  chat.role === 'user'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{chat.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/20 text-white rounded-2xl px-4 py-2">Thinking...</div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-rose-700 text-white rounded-lg hover:bg-blue-600 disabled:bg-rose-600"
              disabled={loading || !message.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
