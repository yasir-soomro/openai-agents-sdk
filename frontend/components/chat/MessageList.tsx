import type { Message } from "@/types/chat";

type MessageListProps = {
  messages: Message[];
  isSending: boolean;
};

export function MessageList({ messages, isSending }: MessageListProps) {
  return (
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
  );
}
