import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssistantMessage {
  sender: 'assistant' | 'user';
  text: string;
}

interface DashboardAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  messages: AssistantMessage[];
  input: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isTyping: boolean;
}

export const DashboardAssistant: React.FC<DashboardAssistantProps> = ({
  isOpen,
  onClose,
  messages,
  input,
  onInputChange,
  onSubmit,
  isTyping,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] cursor-pointer bg-black"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-[150] flex w-full max-w-md flex-col justify-between border-l border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[var(--orbit-border-mid)] px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--orbit-accent-primary)]/30 bg-[color-mix(in_srgb,var(--orbit-accent-primary)_15%,transparent)] sm:h-8 sm:w-8">
                  <Bot
                    size={16}
                    className="text-[var(--orbit-accent-primary)]"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-[var(--orbit-text-primary)]">
                    Orbit Assistant
                  </h4>
                  <span className="block font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                    Agent Active
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Orbit Assistant"
                className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] p-1.5 text-[var(--orbit-text-muted)] hover:text-[var(--orbit-text-primary)]"
              >
                x
              </button>
            </div>

            {/* Chat messages */}
            <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-5 text-left">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex max-w-[85%] items-start gap-2.5 rounded-2xl p-3.5 text-xs leading-relaxed font-semibold shadow-sm',
                    msg.sender === 'user'
                      ? 'ml-auto rounded-tr-none bg-[var(--orbit-accent-primary)] text-white'
                      : 'rounded-tl-none border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] text-[var(--orbit-text-primary)]'
                  )}
                >
                  {msg.sender === 'assistant' && (
                    <Bot
                      size={14}
                      className="mt-0.5 mr-1 shrink-0 text-[var(--orbit-accent-primary)]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="whitespace-pre-line">{msg.text}</span>
                </div>
              ))}
              {isTyping && (
                <div className="flex w-16 items-center gap-1 rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] p-3 text-center shadow-sm">
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--orbit-text-muted)]"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--orbit-text-muted)]"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--orbit-text-muted)]"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              )}
            </div>

            {/* Chat input */}
            <form
              onSubmit={onSubmit}
              className="flex shrink-0 gap-2 border-t border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)]/40 p-3 sm:p-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                aria-label="Message Orbit Assistant"
                placeholder="Ask Orbit Assistant..."
                className="h-10 min-w-0 flex-1 rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-xs text-[var(--orbit-text-primary)] focus:border-[var(--orbit-accent-primary)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              />
              <button
                type="submit"
                aria-label="Send assistant message"
                className="chat-send-btn flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)] text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
              >
                <Send size={14} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
