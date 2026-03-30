'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Activity, ShieldAlert, Sparkles, Mic } from 'lucide-react';

const sampleQuestions = [
  'When can I resume normal activities?',
  'What exercises should I do today?',
  'Is this swelling normal?',
  'How much water should I drink?',
];

type Message = {
  role: 'patient' | 'ai';
  text: string;
  critical?: boolean;
};

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: "Hi! I'm your CareBridge AI assistant. I'm here to answer questions about your recovery and provide personalized guidance. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); // <-- Voice State Added
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isListening]);

  // --- NATIVE VOICE TO TEXT FUNCTION ---
  const handleVoiceInput = () => {
    // @ts-ignore - necessary because TypeScript doesn't natively know webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please use Google Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Set to Indian English for better accuracy!

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // Fills the input box instantly!
    };

    recognition.onend = () => setIsListening(false);
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
  };
  // -------------------------------------

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // 1. Instantly show patient's message
    setMessages((prev) => [...prev, { role: 'patient', text: messageText }]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Call your real Groq Backend
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) throw new Error("API Network Error");

      const data = await res.json();
      let aiResponseText = data.reply;
      let isCritical = false;

      // 3. Parse the [CRITICAL] tag injected by the Groq System Prompt
      if (aiResponseText.includes('[CRITICAL]')) {
        isCritical = true;
        aiResponseText = aiResponseText.replace('[CRITICAL]', '').trim();
      }

      // 4. Update the UI with the real AI response
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: aiResponseText, critical: isCritical },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Connection error. Please call your doctor directly if this is an emergency.', critical: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
      
      {/* 1. Header */}
      <div className="bg-slate-900 p-4 text-white flex items-center gap-3 shadow-md z-10">
        <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <Activity size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
            CareBridge AI <Sparkles size={14} className="text-teal-400" />
          </h3>
          <p className="text-slate-400 text-xs font-medium">Always-on recovery assistant</p>
        </div>
      </div>

      {/* 2. Chat Messages Area */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4 bg-slate-50/50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`max-w-[85%] p-4 shadow-sm text-sm leading-relaxed transition-all duration-300 ${
              msg.role === "ai" 
                ? msg.critical 
                  ? "bg-red-50 border border-red-200 rounded-2xl rounded-tl-sm self-start text-red-900 shadow-md" 
                  : "bg-white border border-slate-200 rounded-2xl rounded-tl-sm self-start text-slate-800"
                : "bg-teal-600 text-white rounded-2xl rounded-tr-sm self-end"
            }`}
          >
            {/* Show red alert banner if critical */}
            {msg.critical && (
              <div className="flex items-center gap-1.5 font-bold text-red-700 mb-2 border-b border-red-200/50 pb-2">
                <ShieldAlert size={16} /> Emergency Escalation Sent
              </div>
            )}
            <p>{msg.text}</p>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] shadow-sm flex items-center gap-1.5 h-12">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}

        {/* Quick Questions (Only shows at the start) */}
        {messages.length === 1 && !isLoading && (
          <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Suggested Questions</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSendMessage(question)}
                  className="text-left text-xs px-3 py-2 rounded-xl border border-teal-100 bg-teal-50/50 text-teal-700 hover:bg-teal-100 transition-colors font-medium shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* 3. Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 z-10">
        <div className="flex gap-2 items-center">
          
          {/* UPDATED VOICE BUTTON */}
          <button 
            type="button" 
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-all shrink-0 ${
              isListening 
                ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse" 
                : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-teal-600"
            }`}
            title="Voice Dictation"
          >
            <Mic size={20} />
          </button>

          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={isListening ? "Listening..." : "Type your secure message..."} 
            className="flex-1 border border-slate-200 rounded-full px-5 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm bg-slate-50 focus:bg-white"
            disabled={isLoading || isListening}
          />
          <button 
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:bg-slate-300 shrink-0 shadow-sm"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}