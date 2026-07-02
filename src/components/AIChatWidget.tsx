import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { X, Send, Bot, Loader2, Sparkles, ChevronDown, RotateCcw, AlertCircle } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SYSTEM PROMPT — TechVistar knowledge base
───────────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are TechVistar's AI assistant — a friendly, concise, and knowledgeable guide for the TechVistar website. Your role is to help visitors understand services, answer questions, and guide them toward taking the next step.

COMPANY OVERVIEW
TechVistar is a technology-first growth partner based in Hyderabad, Telangana, India. Founded in 2022. We partner with startups, SMEs, and institutions to ship digital products and operating systems. Engagements are scoped in writing, demonstrated on a steady cadence, and signed off with documentation.

CONTACT INFORMATION
- Email: support@techvistar.com
- Phone: +91 9573157982
- Location: Hyderabad, Telangana, India

KEY STATS
- 60+ completed engagements
- 98% on-time milestone delivery
- 4.9/5 post-project satisfaction score
- Founded: 2022

OUR 6 SERVICES

1. Growth Stack Blueprint — End-to-end product foundations: web/mobile apps, APIs, integrations. Tech: React, Node.js, PostgreSQL, Docker.
2. Revenue Web Engine — High-conversion websites, analytics, SEO. Tech: Next.js, GA4, GTM.
3. Automate & Integrate — CRM integrations, workflow automation. Tech: Make.com, Zapier, n8n, HubSpot.
4. Brand & Growth Flywheel — Positioning, content, pipeline programs. Tech: Figma, LinkedIn, email platforms.
5. Applied AI & Decision Support — LLM integration, RAG pipelines, AI features. Tech: OpenAI, Gemini, LangChain, Python.
6. Documentation & Research Desk — SRS, API docs, academic writing. Tech: Notion, Confluence, LaTeX.

OUR PROCESS (VISTAR Framework)
V-Vision Alignment, I-Infrastructure Planning, S-Sprint Execution, T-Testing & QA, A-Analytics & Handover, R-Review & Iterate.

PRICING
We scope every engagement individually and provide a written SOW or proposal after a discovery call. Contact us for a quote.

HOW TO GET STARTED: Visit /contact, email support@techvistar.com, or call +91 9573157982.

TONE: Be warm, professional, and concise. Keep responses to 2-4 short paragraphs or bullet points. End with a helpful CTA. Never make up pricing or timelines.`;

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Role = 'user' | 'assistant';

interface Message {
  id: string;
  role: Role;
  content: string;
  isStreaming?: boolean;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm TechVistar's AI assistant 👋\n\nAsk me anything about our services, process, or how to get started.",
};

const STARTER_PROMPTS = [
  'What services do you offer?',
  'How does your process work?',
  'How do I get a quote?',
  'Tell me about your AI services',
];

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

/* ─────────────────────────────────────────────────────────────
   TEXT RENDERER
───────────────────────────────────────────────────────────── */
function MessageContent({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line === '') return <div key={i} className="h-1" />;
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (/^[-•*]\s/.test(line)) {
          return (
            <div key={i} className="flex gap-1.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
              <span className="leading-relaxed text-white/75" dangerouslySetInnerHTML={{ __html: bold.replace(/^[-•*]\s/, '') }} />
            </div>
          );
        }
        return <p key={i} className="leading-relaxed text-white/75" dangerouslySetInnerHTML={{ __html: bold }} />;
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TYPING DOTS
───────────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MESSAGE BUBBLE
───────────────────────────────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="mr-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6E7FEF]/20 border border-[#6E7FEF]/30">
          <Bot className="h-3 w-3 text-[#8B9CF4]" />
        </div>
      )}
      <div
        className={[
          'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm',
          isUser
            ? 'rounded-tr-sm bg-[#6E7FEF] text-white'
            : 'rounded-tl-sm bg-white/[0.06] border border-white/[0.08]',
        ].join(' ')}
      >
        {msg.isStreaming && msg.content === '' ? (
          <TypingDots />
        ) : (
          <MessageContent text={msg.content} />
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN WIDGET
───────────────────────────────────────────────────────────── */
export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Check if key exists and looks valid
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  const hasKey = Boolean(apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.length > 10);

  /* ── Auto scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ── Focus input on open ── */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const reset = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setErrorMsg(null);
    setInput('');
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    if (!hasKey) {
      setErrorMsg('Add your Gemini API key to .env.local and restart the dev server.');
      return;
    }

    setErrorMsg(null);
    setInput('');

    const userMsg: Message = { id: generateId(), role: 'user', content: trimmed };
    const assistantId = generateId();
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '', isStreaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey!);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Build the full prompt with system context + conversation history
      const historyMessages = [...messages, userMsg].filter((m) => m.id !== 'welcome');

      let fullPrompt = `${SYSTEM_PROMPT}\n\n--- CONVERSATION ---\n`;
      for (const m of historyMessages) {
        fullPrompt += m.role === 'user' ? `User: ${m.content}\n` : `Assistant: ${m.content}\n`;
      }
      fullPrompt += 'Assistant:';

      const result = await model.generateContentStream(fullPrompt);

      let fullText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fullText, isStreaming: true } : m
          )
        );
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: fullText, isStreaming: false } : m
        )
      );
    } catch (err: unknown) {
      console.error('Gemini error:', err);

      // Surface a helpful error based on what went wrong
      let friendlyError = 'Something went wrong.';
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('400')) {
        friendlyError = 'Invalid API key. Please check your .env.local file and make sure you copied the key correctly from aistudio.google.com.';
      } else if (errMsg.includes('429')) {
        friendlyError = 'Rate limit reached. Please wait a moment and try again.';
      } else if (errMsg.includes('fetch') || errMsg.includes('network')) {
        friendlyError = 'Network error. Please check your internet connection.';
      } else {
        friendlyError = `Error: ${errMsg.slice(0, 120)}`;
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: '', isStreaming: false }
            : m
        ).filter((m) => !(m.id === assistantId && m.content === ''))
      );
      setErrorMsg(friendlyError);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasKey, apiKey, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[88px] right-5 z-50 flex w-[370px] flex-col rounded-2xl border border-white/[0.10] bg-[#0e1117]/95 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#6E7FEF]/20 border border-[#6E7FEF]/30">
                  <Sparkles className="h-4 w-4 text-[#8B9CF4]" />
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#0e1117]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">TechVistar AI</p>
                  <p className="text-[11px] text-white/40 mt-0.5">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  title="Reset conversation"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Error banner inside messages */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3"
                >
                  <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-red-300 leading-relaxed">{errorMsg}</p>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Starter prompts — only on welcome screen */}
            {messages.length === 1 && !isLoading && (
              <div className="px-3 pb-2 shrink-0">
                <div className="grid grid-cols-2 gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-2 text-left text-[11px] text-white/50 hover:text-white/80 hover:border-[#6E7FEF]/30 hover:bg-[#6E7FEF]/[0.05] transition-all duration-150 leading-snug"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No API key warning */}
            {!hasKey && (
              <div className="mx-3 mb-3 shrink-0 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="text-[11px] text-amber-300 leading-relaxed">
                  <strong className="text-amber-200">API key needed.</strong> Add your Gemini key to{' '}
                  <code className="rounded bg-black/30 px-1 py-0.5 font-mono text-[10px]">.env.local</code>
                  , then restart the dev server.{' '}
                  <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="underline hover:text-amber-100">
                    Get key →
                  </a>
                </p>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/[0.07] p-3 shrink-0">
              <div className="flex items-end gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 focus-within:border-[#6E7FEF]/40 transition-colors duration-150">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about TechVistar…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none leading-relaxed"
                  style={{ maxHeight: '80px' }}
                  disabled={isLoading || !hasKey}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading || !hasKey}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#6E7FEF] text-white hover:bg-[#5E6AD2] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
                >
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-white/20">
                AI can make mistakes · Always verify important info
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open AI chat"
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-[#0e1117]/90 px-4 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl hover:border-[#6E7FEF]/40 transition-all duration-300 hover:shadow-[0_8px_32px_-4px_rgba(110,127,239,0.25)]"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-[#6E7FEF]/40 animate-ping opacity-50 pointer-events-none" />
        )}

        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#6E7FEF]/20 border border-[#6E7FEF]/30">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <ChevronDown className="h-3.5 w-3.5 text-[#8B9CF4]" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Sparkles className="h-3.5 w-3.5 text-[#8B9CF4]" />
              </motion.span>
            )}
          </AnimatePresence>
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#0e1117]" />
          )}
        </div>

        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors pr-0.5">
          {isOpen ? 'Close' : 'Ask AI'}
        </span>
      </motion.button>
    </>
  );
}
