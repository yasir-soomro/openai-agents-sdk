export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type ChatResponse = {
  response: string;
};
