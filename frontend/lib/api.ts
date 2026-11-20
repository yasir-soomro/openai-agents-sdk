import type { ChatResponse } from "@/types/chat";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid response. Please try again.");
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

  return { response: result.response };
}
