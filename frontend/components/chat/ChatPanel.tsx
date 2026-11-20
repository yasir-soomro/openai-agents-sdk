"use client";

import { useChat } from "@/hooks/useChat";
import { ChatComposer } from "./ChatComposer";
import { ChatSuggestions } from "./ChatSuggestions";
import { MessageList } from "./MessageList";

export function ChatPanel() {
  const { messages, input, setInput, isSending, sendMessage } = useChat();

  return (
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

      <MessageList messages={messages} isSending={isSending} />

      {messages.length === 1 && (
        <ChatSuggestions isSending={isSending} onSelect={(message) => void sendMessage(message)} />
      )}

      <ChatComposer
        input={input}
        isSending={isSending}
        onInputChange={setInput}
        onSend={(message) => void sendMessage(message)}
      />
      <p className="disclaimer">
        Support assistant · Please don’t share sensitive personal information
      </p>
    </section>
  );
}
