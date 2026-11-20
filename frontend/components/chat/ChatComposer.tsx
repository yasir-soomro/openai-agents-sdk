import type { FormEvent } from "react";

type ChatComposerProps = {
  input: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onSend: (message: string) => void;
};

export function ChatComposer({ input, isSending, onInputChange, onSend }: ChatComposerProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSend(input);
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="message">Your message</label>
      <input
        autoComplete="off"
        id="message"
        maxLength={1000}
        onChange={(event) => onInputChange(event.target.value)}
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
  );
}
