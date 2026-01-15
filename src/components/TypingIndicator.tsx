export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 message-assistant w-fit">
      <div className="typing-dot w-2 h-2 bg-primary rounded-full" />
      <div className="typing-dot w-2 h-2 bg-primary rounded-full" />
      <div className="typing-dot w-2 h-2 bg-primary rounded-full" />
    </div>
  );
}
