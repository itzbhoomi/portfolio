'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

// Define the structure of a chat message
interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const aiMessage: ChatMessage = { role: 'ai', text: data.reply };
      setChatHistory((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                  chat.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{chat.text}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2">
                    Thinking...
                </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading || !message}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
