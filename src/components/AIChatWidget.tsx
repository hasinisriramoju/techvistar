import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { X, Send, Bot, Loader2, Sparkles, ChevronDown, RotateCcw } from 'lucide-react';

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
- Website: https://techvistar.com

KEY STATS
- 60+ completed engagements
- 98% on-time milestone delivery
- 4.9/5 post-project satisfaction score
- Founded: 2022

OUR 6 SERVICES

1. Growth Stack Blueprint
   What: End-to-end product foundations — web and mobile applications, APIs, and integrations scoped as one coherent system.
   Deliverables: Roadmap & milestone plan, web/mobile/API delivery, environments & release discipline, acceptance & sign-off.
   Technologies: React, React Native, Node.js, PostgreSQL, Docker, APIs.

2. Revenue Web Engine
   What: High-trust, high-conversion websites with performance analytics and SEO foundations.
   Deliverables: Conversion-optimised site, analytics event setup, CMS/content handover, SEO baseline.
   Technologies: Next.js, Webflow, GA4, GTM, Figma-to-code.

3. Automate & Integrate
   What: CRM integrations, workflow automation, and data pipelines that eliminate manual operations.
   Deliverables: Workflow maps, automation build, CRM integration, monitoring & handover.
   Technologies: Make.com, Zapier, n8n, REST APIs, webhooks, HubSpot, Notion.

4. Brand & Growth Flywheel
   What: Positioning, content systems, and pipeline programs that turn brand investment into pipeline.
   Deliverables: Brand system, content calendar, channel playbooks, analytics dashboard.
   Technologies: Figma, Canva, LinkedIn, Instagram, email platforms.

5. Applied AI & Decision Support
   What: Applied AI, LLMs, and decision-support tools integrated into existing workflows.
   Deliverables: AI feature scoping, LLM integration, RAG pipeline, demo & documentation.
   Technologies: OpenAI, Gemini, LangChain, Python, vector databases, fine-tuning.

6. Documentation & Research Desk
   What: Technical documentation, SRS documents, API docs, and academic research support.
   Deliverables: SRS/PRD, API documentation, user manuals, academic writing support.
   Technologies: Notion, Confluence, Markdown, LaTeX.

OUR PROCESS (VISTAR Framework)
V — Vision Alignment: Understanding your goals, audience, and success metrics.
I — Infrastructure Planning: Scoping the system architecture, timeline, and budget.
S — Sprint Execution: Agile delivery in weekly sprints with demos and reviews.
T — Testing & QA: Rigorous testing against acceptance criteria before handover.
A — Analytics & Handover: Full documentation, training, and ownership transfer.
R — Review & Iterate: Post-launch support and iterative improvements.

PRICING APPROACH
We don't publish fixed prices — every engagement is scoped based on your specific requirements. We provide a written Scope of Work (SOW) or proposal after an initial discovery call. Best to contact us for a scoped proposal.

HOW TO GET STARTED
1. Visit the Contact page at /contact
2. Email support@techvistar.com
3. Call +91 9573157982

TONE GUIDELINES
- Be warm, professional, and concise
- Keep responses to 2-4 short paragraphs max (or use bullet points for lists)
- If you don't know something specific, direct to contact@techvistar.com
- Always end with a helpful CTA (visit contact page, call, or email)
- Never make up pricing, timelines, or team member names
- You can use light markdown formatting (bold, bullets) in your responses`;

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
  content: "Hi! I'm TechVistar's AI assistant. 👋\n\nI can help you learn about our services, process, or how to get started. What would you like to know?",
};

const STARTER_PROMPTS = [
  'What services do you offer?',
  'How does your process work?',
  'How do I get a quote?',
  'Tell me about Applied AI services',
];

/* ─────────────────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────────────────── */
function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function formatContent(text: string) {
  // Basic markdown → JSX-friendly formatting
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const key = i;
    // Bold: **text**
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.startsWith('- ') || line.startsWith('• ')) {
      return (
        <li key={key} className="ml-3 list-disc text-white/75 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-•]\s/, '') }} />
      );
    }
    if (line === '') return <div key={key} className="h-1" />;
    return (
      <p key={key} className="leading-relaxed text-white/75" dangerouslySetInnerHTML={{ __html: formatted }} />
    );
  });
}

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
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
          <div className="space-y-1.5">{formatContent(msg.content)}</div>
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
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<ReturnType<InstanceType<typeof GoogleGenerativeAI>['getGenerativeModel']> | null>(null);

  /* ── Init Gemini ── */
  useEffect(() => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key || key === 'your_gemini_api_key_here') {
      setHasKey(false);
      return;
    }
    try {
      const genAI = new GoogleGenerativeAI(key);
      chatRef.current = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: SYSTEM_PROMPT,
      });
    } catch {
      setHasKey(false);
    }
  }, []);

  /* ── Auto scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ── Focus input on open ── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const reset = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setInput('');
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    if (!hasKey || !chatRef.current) {
      setError('API key not configured. See .env.local file.');
      return;
    }

    setError(null);
    setInput('');

    // Add user message
    const userMsg: Message = { id: generateId(), role: 'user', content: trimmed };
    const assistantId = generateId();
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '', isStreaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);

    try {
      // Build history from current messages (exclude welcome and last streaming placeholder)
      const historyMessages = messages.filter(
        (m) => m.id !== 'welcome' && !m.isStreaming
      );
      const history = historyMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const chat = chatRef.current.startChat({ history });
      const result = await chat.sendMessageStream(trimmed);

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

      // Mark as done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: fullText, isStreaming: false } : m
        )
      );
    } catch (err) {
      console.error('Gemini error:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Sorry, something went wrong. Please try again or contact support@techvistar.com directly.', isStreaming: false }
            : m
        )
      );
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasKey, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ── No-key banner ── */
  const NoBanner = () => (
    <div className="mx-3 mb-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
      <p className="text-xs text-amber-300 leading-relaxed">
        <strong className="text-amber-200">API key needed.</strong> Add your Gemini key to{' '}
        <code className="rounded bg-black/30 px-1 py-0.5 font-mono text-[11px]">.env.local</code>
        , then restart the dev server.{' '}
        <a
          href="https://aistudio.google.com"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-amber-100"
        >
          Get key →
        </a>
      </p>
    </div>
  );

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
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
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
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Starter prompts — only show if only welcome message */}
            {messages.length === 1 && (
              <div className="px-3 pb-2">
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

            {/* API key warning */}
            {!hasKey && <NoBanner />}

            {/* Error */}
            {error && (
              <div className="mx-3 mb-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                <p className="text-[11px] text-red-300">{error}</p>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/[0.07] p-3">
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
        {/* Pulse ring */}
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
