import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSend, IoClose, IoTrashOutline, IoCopyOutline, IoCheckmark, IoSparkles, IoChevronDown } from 'react-icons/io5';
import { GROQ_CONFIG } from '../config/groq';

// Helper to format inline markdown (**bold**, *italic*, `code`)
const renderInline = (text) => {
  if (!text) return text;

  // Split by inline code: `code`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, pIdx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code 
          key={pIdx} 
          className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 font-mono text-[11px] text-primeBlue dark:text-primeCyan border border-slate-300/60 dark:border-white/10 mx-0.5"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Split by bold: **bold**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
        return (
          <strong key={`${pIdx}-${bIdx}`} className="font-bold text-slate-900 dark:text-white">
            {bPart.slice(2, -2)}
          </strong>
        );
      }

      // Split by italic: *italic*
      const italicParts = bPart.split(/(\*[^*]+\*)/g);
      return italicParts.map((iPart, iIdx) => {
        if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
          return <em key={`${pIdx}-${bIdx}-${iIdx}`} className="italic">{iPart.slice(1, -1)}</em>;
        }
        return iPart;
      });
    });
  });
};

// Formats message blocks (headings like ##, ###, bullet points, numbered lists, paragraphs)
const renderFormattedContent = (content) => {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h5 key={lineIdx} className="font-bold text-sm text-slate-900 dark:text-white mt-2 mb-1">
              {renderInline(trimmed.replace(/^###\s+/, ''))}
            </h5>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={lineIdx} className="font-bold text-base text-primeBlue dark:text-primeCyan mt-2 mb-1">
              {renderInline(trimmed.replace(/^##\s+/, ''))}
            </h4>
          );
        }

        // Heading 1
        if (trimmed.startsWith('# ')) {
          return (
            <h3 key={lineIdx} className="font-extrabold text-base text-slate-900 dark:text-white mt-2.5 mb-1">
              {renderInline(trimmed.replace(/^#\s+/, ''))}
            </h3>
          );
        }

        // Bullet point: - or *
        if (/^[-*]\s+/.test(trimmed)) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 ml-1 text-xs sm:text-sm">
              <span className="text-primeBlue dark:text-primeCyan text-base leading-none mt-0.5">•</span>
              <span className="flex-1">{renderInline(trimmed.replace(/^[-*]\s+/, ''))}</span>
            </div>
          );
        }

        // Numbered list: 1. , 2. 
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 ml-1 text-xs sm:text-sm">
              <span className="font-mono font-semibold text-primeBlue dark:text-primeCyan text-xs mt-0.5">{numMatch[1]}.</span>
              <span className="flex-1">{renderInline(numMatch[2])}</span>
            </div>
          );
        }

        // Regular line / paragraph
        return (
          <p key={lineIdx} className="text-xs sm:text-sm">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am the **Infinexa AI Assistant**, the official intelligence for Infinexa Studio. Ask me anything about our Agentic AI frameworks, products (such as YourPrompty & MeritMap), or how we can architect custom intelligent software for you!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    "What is Infinexa Studio?",
    "Explain your Agentic AI framework",
    "What are YourPrompty & MeritMap?",
    "How can I work with you?"
  ];

  // Mouse tracking for the cute eye movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const eyeX = (mousePos.x / window.innerWidth) * 14 - 7;
  const eyeY = (mousePos.y / window.innerHeight) * 14 - 7;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend) => {
    const text = textToSend || inputMessage.trim();
    if (!text || loading) return;

    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: GROQ_CONFIG.systemPrompt },
        ...newMessages.map((m) => ({
          role: m.role,
          content: m.content
        }))
      ];

      const response = await fetch(GROQ_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_CONFIG.model,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error("Unable to reach Infinexa AI server.");
      }

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error("AI Assistant error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "⚠️ **Connection Error**: Unable to complete your request right now. Please check your network and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyToClipboard = (content, index) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! How can I assist you with Infinexa Studio today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-white/95 dark:bg-darkBg/95 backdrop-blur-2xl border border-slate-200 dark:border-primeCyan/40 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(46,196,182,0.3)] flex flex-col overflow-hidden mb-4 mr-0 transition-colors duration-300"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-100 to-slate-200/80 dark:from-cardBg/90 dark:to-darkBg/90 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-primeBlue/15 dark:bg-primeBlue/20 border border-primeBlue/30 dark:border-primeCyan/50 flex items-center justify-center text-primeBlue dark:text-primeCyan shadow-sm dark:shadow-[0_0_15px_rgba(46,196,182,0.4)]">
                  <IoSparkles className="text-lg" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white dark:border-darkBg animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Infinexa AI Assistant
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-primeBlue dark:text-primeCyan">
                    <span>⚡ Infinexa Core</span>
                    <span className="text-slate-400 dark:text-gray-500">•</span>
                    <span className="text-slate-600 dark:text-gray-300">Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-500 dark:text-gray-400">
                <button
                  onClick={clearChat}
                  title="Clear conversation"
                  className="p-1.5 hover:text-red-500 hover:bg-slate-200/60 dark:hover:text-red-400 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <IoTrashOutline className="text-base" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 hover:text-slate-900 hover:bg-slate-200/60 dark:hover:text-white dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <IoChevronDown className="text-lg" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-sans scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-md relative group ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-primeBlue to-primeCyan text-white rounded-br-none'
                        : 'bg-slate-100 border border-slate-200 text-slate-800 dark:bg-cardBg/80 dark:border-white/10 dark:text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <div className="leading-relaxed">
                      {renderFormattedContent(msg.content)}
                    </div>

                    {/* Copy action on hover for bot messages */}
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(msg.content, i)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/90 dark:bg-darkBg/60 rounded text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white shadow-sm"
                        title="Copy message"
                      >
                        {copiedIndex === i ? <IoCheckmark className="text-emerald-500 dark:text-emerald-400 text-xs" /> : <IoCopyOutline className="text-xs" />}
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-primeBlue dark:text-primeCyan text-xs font-mono p-2 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 w-fit">
                  <span className="w-2 h-2 rounded-full bg-primeCyan animate-ping"></span>
                  <span>Infinexa AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-darkBg/60 border-t border-slate-200 dark:border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  disabled={loading}
                  className="whitespace-nowrap text-[11px] px-3 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-primeBlue/10 dark:hover:bg-primeCyan/20 hover:text-primeBlue dark:hover:text-primeCyan border border-slate-200 dark:border-white/10 transition-colors text-slate-600 dark:text-gray-300 cursor-pointer disabled:opacity-50 flex-shrink-0 shadow-sm dark:shadow-none"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-100/90 dark:bg-cardBg/90 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Infinexa Studio, AI..."
                disabled={loading}
                className="flex-1 bg-white dark:bg-darkBg/80 border border-slate-200 dark:border-white/10 focus:border-primeBlue dark:focus:border-primeCyan rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !inputMessage.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-primeBlue to-primeCyan hover:opacity-90 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <IoSend className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Robot Head (Trigger Button) */}
      <div className="relative flex flex-col items-end">
        {/* Dynamic Speech Bubble (shown when chat is closed) */}
        {!isOpen && (
          <motion.div
            onClick={() => setIsOpen(true)}
            className="absolute bottom-[92px] right-2 bg-white/95 dark:bg-primeBlue/40 backdrop-blur-md border border-slate-200 dark:border-primeCyan/60 text-slate-800 dark:text-white text-xs px-4 py-2 rounded-2xl rounded-br-none shadow-md dark:shadow-[0_0_25px_rgba(46,196,182,0.45)] whitespace-nowrap overflow-hidden cursor-pointer hover:bg-slate-100 dark:hover:bg-primeBlue/60 transition-colors"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="font-mono text-primeCyan animate-pulse mr-1.5">●</span>
            <span>Chat with Infinexa AI</span>
          </motion.div>
        )}

        {/* Bot Head / Glass Sphere */}
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white to-slate-100 dark:from-cardBg/95 dark:to-darkBg/95 backdrop-blur-xl border-2 border-primeBlue dark:border-primeCyan rounded-bl-[40%] rounded-br-[40%] rounded-tl-3xl rounded-tr-3xl shadow-[0_10px_35px_rgba(11,91,161,0.25)] dark:shadow-[0_0_40px_rgba(46,196,182,0.5)] flex items-center justify-center cursor-pointer relative overflow-hidden group"
          whileHover={{ scale: 1.1, boxShadow: "0 15px 45px rgba(11,91,161,0.35)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glow core behind eyes */}
          <div className="absolute inset-x-2 top-4 bottom-8 bg-primeBlue/20 dark:bg-primeBlue/40 rounded-full blur-[10px]"></div>

          {/* Eyes container */}
          <div className="flex gap-2.5 md:gap-3 relative z-10 w-full justify-center -mt-2">
            {/* Left Eye */}
            <div className="w-4 h-7 md:w-5 md:h-8 bg-slate-900 dark:bg-white/95 rounded-[40%] overflow-hidden flex items-center justify-center shadow-inner">
              <motion.div
                className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primeCyan rounded-full border border-slate-900 dark:border-darkBg shadow-[0_0_6px_#fff]"
                animate={{ x: eyeX, y: eyeY }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </div>
            {/* Right Eye */}
            <div className="w-4 h-7 md:w-5 md:h-8 bg-slate-900 dark:bg-white/95 rounded-[40%] overflow-hidden flex items-center justify-center shadow-inner">
              <motion.div
                className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primeCyan rounded-full border border-slate-900 dark:border-darkBg shadow-[0_0_6px_#fff]"
                animate={{ x: eyeX, y: eyeY }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </div>
          </div>

          {/* Cheeks */}
          <div className="absolute top-[40px] md:top-[45px] left-2.5 md:left-3 w-3.5 md:w-4 h-2 bg-pink-500/60 blur-[3px] rounded-full group-hover:bg-pink-400"></div>
          <div className="absolute top-[40px] md:top-[45px] right-2.5 md:right-3 w-3.5 md:w-4 h-2 bg-pink-500/60 blur-[3px] rounded-full group-hover:bg-pink-400"></div>

          {/* Smile */}
          <div className="absolute top-[48px] md:top-[52px] left-1/2 -translate-x-1/2 w-3.5 md:w-4 h-2 border-b-2 border-slate-800/70 dark:border-white/70 rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatBot;
