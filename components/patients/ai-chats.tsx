'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const sampleQuestions = [
  'When can I resume normal activities?',
  'What exercises should I do today?',
  'Is this swelling normal?',
  'How much water should I drink?',
];

export function AIChat() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([
    {
      type: 'ai',
      text: "Hi! I'm your CareBridge AI assistant. I'm here to answer questions about your recovery and provide personalized guidance. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', text: messageText }]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your recovery progress, you're doing great! Continue following your exercise plan and take medications as prescribed.",
        "That's a common question. Light exercises are recommended at this stage. Avoid strenuous activities for now.",
        "Some swelling is normal after surgery. However, if it's increasing or causing pain, please contact your care team.",
        "Stay hydrated! Aim for 8-10 glasses of water daily, or as recommended by your doctor.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { type: 'ai', text: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="card-hover bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">AI Recovery Assistant</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Ask anything about your recovery</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-foreground rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs text-muted-foreground font-semibold">Popular questions:</p>
            <div className="grid grid-cols-1 gap-2">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSendMessage(question)}
                  className="text-left text-xs p-2 rounded border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2 border-t border-border pt-3">
          <Input
            placeholder="Ask your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="text-sm"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-white px-4"
            size="sm"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
