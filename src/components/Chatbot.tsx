"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const QUICK_PROMPTS = [
  "Apa keahlian utama Ilham?",
  "Pengalaman kerja saat ini?",
  "Proyek IoT apa yang pernah dibuat?",
];

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Halo! Saya AI Assistant Ilham Bonardo. Ada yang ingin kamu tanyakan seputar pengalaman, skills, atau proyek Ilham?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      if (res.ok && data.answer) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
      } else {
        console.error("[Chatbot] API request failed", {
          status: res.status,
          statusText: res.statusText,
          requestId: data.requestId,
          error: data.error,
        });
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.error || "Maaf, terjadi masalah saat memproses pesanmu.",
          },
        ]);
      }
    } catch (error) {
      console.error("[Chatbot] Network or response parsing failed", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Koneksi terputus. Silakan coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-neutral-950 px-5 py-20 text-neutral-100 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <div className="max-w-xl">
          <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Punya pertanyaan tentang perjalanan saya?
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
            Tanyakan pengalaman kerja, keahlian, atau project yang pernah saya
            kerjakan. Saya akan membantu menemukan jawabannya.
          </p>
        </div>

        <div className="flex h-[min(620px,78vh)] min-h-125 flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 border-b border-neutral-800 px-5 py-4 sm:px-6">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Ilham Assistant AI</h3>
              <p className="text-[11px] text-neutral-500">Powered by Gemini</p>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-3.5 overflow-y-auto p-4 text-xs sm:p-6 sm:text-sm"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-blue-600 text-white"
                      : "rounded-bl-none border border-neutral-700/50 bg-neutral-800 text-neutral-200"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="m-0">{children}</p>,
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none border border-neutral-700/50 bg-neutral-800 px-4 py-3 text-neutral-400">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 3 && !isLoading && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-4 sm:px-6">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-neutral-700 bg-neutral-950/70 px-3 py-1.5 text-[11px] text-neutral-300 transition hover:border-blue-500 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-neutral-800 bg-neutral-950/50 p-3 sm:p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu tentang Ilham..."
              className="min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 outline-none transition focus:border-blue-500 sm:text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="shrink-0 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-40 sm:px-5 sm:text-sm"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
