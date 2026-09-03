"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiArrowUp, FiRefreshCw } from "react-icons/fi";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: Message = {
  role: "assistant",
  content:
    "Halo, saya asisten virtual Ilham. Tanyakan pengalaman, project, atau kemampuan yang ingin kamu ketahui.",
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;

    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmedQuestion };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message ?? "Chatbot sedang tidak tersedia.",
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.answer },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Terjadi kesalahan. Silakan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetChat() {
    setMessages([initialMessage]);
    setQuestion("");
    setError("");
  }

  return (
    <section
      id="chatbot"
      className="relative overflow-hidden bg-stone-100 px-5 py-24 text-stone-900 dark:bg-zinc-950 dark:text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-stone-300 pb-8 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-stone-500 dark:text-zinc-500">
              <span>Interactive profile</span>
            </div>
            <h2 className="max-w-3xl font-nb text-5xl font-semibold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
              DEFINITION
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-stone-600 dark:text-zinc-400 md:text-right">
            Kenali cara kerja, pengalaman, dan project melalui percakapan
            singkat.
          </p>
        </div>

        <div className="grid overflow-hidden border border-stone-300 bg-white/70 dark:border-white/10 dark:bg-white/3 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-between border-b border-stone-300 p-6 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500 dark:text-zinc-500">
                Portfolio assistant
              </p>
              <p className="max-w-sm text-2xl leading-tight text-stone-800 dark:text-zinc-200 sm:text-3xl">
                Satu pertanyaan untuk menemukan konteks yang tepat.
              </p>
            </div>
            <div className="mt-14 border-l border-stone-400 pl-4 text-sm leading-6 text-stone-500 dark:border-white/20 dark:text-zinc-500">
              Coba tanyakan: &quot;Apa project yang paling menantang?&quot;
            </div>
          </div>

          <div className="flex h-124 min-h-0 flex-col bg-stone-200/70 dark:bg-black/20">
            <div className="flex items-center justify-between border-b border-stone-300 px-5 py-4 dark:border-white/10 sm:px-8">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-zinc-500">
                Live conversation
              </span>
              <button
                type="button"
                onClick={resetChat}
                className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-500 dark:hover:text-white"
                aria-label="Mulai percakapan baru"
              >
                <FiRefreshCw aria-hidden="true" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              data-lenis-prevent
              className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-8"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap text-sm leading-6 sm:max-w-[75%] ${
                      message.role === "user"
                        ? "border border-stone-300 bg-white px-4 py-3 text-stone-900"
                        : "border-l border-stone-400 pl-4 text-stone-700 dark:border-white/30 dark:text-zinc-300"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0">{children}</p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-stone-900 dark:text-white">
                              {children}
                            </strong>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-4 hover:text-stone-900 dark:hover:text-white"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <p className="border-l border-stone-400 pl-4 text-sm text-stone-500 dark:border-white/30 dark:text-zinc-500">
                  Sedang menyusun jawaban...
                </p>
              )}
              {error && <p className="text-sm text-red-300">{error}</p>}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-stone-300 p-4 dark:border-white/10 sm:p-6"
            >
              <label htmlFor="chat-question" className="sr-only">
                Tulis pertanyaan
              </label>
              <div className="flex items-center gap-3 border-b border-stone-400 pb-2 focus-within:border-stone-900 dark:border-white/30 dark:focus-within:border-white">
                <input
                  id="chat-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Tulis pertanyaanmu..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-stone-900 outline-none placeholder:text-stone-500 dark:text-white dark:placeholder:text-zinc-600"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  className="flex h-10 w-10 shrink-0 items-center cursor-pointer justify-center bg-white text-black transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Kirim pertanyaan"
                >
                  <FiArrowUp aria-hidden="true" size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
