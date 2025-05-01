import OpenAI from "openai";

const XAI_API_KEY = process.env.XAI_API_KEY || "xai-kytAEEcUWQU476BCPODSwekJz3W4lSx3ZqsOVXIGjrQ6zI0II8qX06E2Va1UyHqI4XRH6rPhXKLTXJGB";

class GrokClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: XAI_API_KEY,
      baseURL: "https://api.x.ai/v1",
    });
  }

  async generateCompletion(messages, model = "grok-3-beta") {
    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages,
      });
      return completion;
    } catch (error) {
      console.error("Error generating completion:", error);
      throw error;
    }
  }
}

export const grokClient = new GrokClient(); 