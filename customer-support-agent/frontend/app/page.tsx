"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const suggestions = [
  "How can I get help with an order?",
  "What can you help me with?",
  "Can you help me troubleshoot a problem?",
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your customer support assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(message: string) {
    const text = message.trim();
    if (!text || isSending) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      let result: unknown;
      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response. Please try again.",
        );
      }

      if (!response.ok) {
        const detail =
          typeof result === "object" &&
          result !== null &&
          "detail" in result &&
          typeof result.detail === "string"
            ? result.detail
            : "The assistant couldn't respond. Please try again.";
        throw new Error(detail);
      }

      if (
        typeof result !== "object" ||
        result === null ||
        !("response" in result) ||
        typeof result.response !== "string"
      ) {
        throw new Error("The assistant returned an invalid response.");
      }

      const reply = result.response;
      setMessages((current) => [
        ...current,
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <main className="support-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Customer Support home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>Support<span className="brand-dot">.</span></span>
        </Link>
        <span className="availability">
          <span className="status-dot" />
          Assistant online
        </span>
      </header>

      <section className="chat-panel" aria-label="Customer support chat">
        <div className="chat-heading">
          <div className="assistant-avatar" aria-hidden="true">S</div>
          <div>
            <p className="eyebrow">CUSTOMER CARE</p>
            <h1>How can we help?</h1>
            <p className="heading-copy">
              Ask a question and our support assistant will be happy to help.
            </p>
          </div>
        </div>

        <div className="conversation" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`message-row ${message.role}`} key={index}>
              {message.role === "assistant" && (
                <span className="message-avatar" aria-hidden="true">S</span>
              )}
              <p className="message-bubble">{message.content}</p>
            </div>
          ))}
          {isSending && (
            <div className="message-row assistant" aria-label="Assistant is typing">
              <span className="message-avatar" aria-hidden="true">S</span>
              <p className="message-bubble typing"><span /><span /><span /></p>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="suggestions" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <button
                className="suggestion"
                key={suggestion}
                onClick={() => void sendMessage(suggestion)}
                disabled={isSending}
                type="button"
              >
                {suggestion}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        )}

        <form className="composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="message">
            Your message
          </label>
          <input
            autoComplete="off"
            id="message"
            maxLength={1000}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Write your message..."
            value={input}
          />
          <button
            className="send-button"
            disabled={isSending || !input.trim()}
            type="submit"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4.75 12h14.5m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
        <p className="disclaimer">
          Support assistant · Please don’t share sensitive personal information
        </p>
      </section>
      <footer className="footer">Here to make things easier.</footer>
    </main>
  );
}
