const suggestions = [
  "How can I get help with an order?",
  "What can you help me with?",
  "Can you help me troubleshoot a problem?",
];

type ChatSuggestionsProps = {
  isSending: boolean;
  onSelect: (message: string) => void;
};

export function ChatSuggestions({ isSending, onSelect }: ChatSuggestionsProps) {
  return (
    <div className="suggestions" aria-label="Suggested questions">
      {suggestions.map((suggestion) => (
        <button
          className="suggestion"
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          disabled={isSending}
          type="button"
        >
          {suggestion}
          <span aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  );
}
