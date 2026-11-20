"use client";

import { useState } from "react";
import { sendChatMessage } from "@/lib/api";
import type { Message } from "@/types/chat";

const welcomeMessage: Message = {
  role: "assistant",
  content: "Hi there! I'm your customer support assistant. How can I help you today?",
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(message: string) {
    const text = message.trim();
    if (!text || isSending) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setIsSending(true);

    try {
      const result = await sendChatMessage(text);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.response },
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

  return { messages, input, setInput, isSending, sendMessage };
}
