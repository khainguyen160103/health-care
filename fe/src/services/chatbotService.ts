import { chatbotApi } from "./apiClient";
import { ChatMessage } from "../types";

export interface SendMessageRequest {
  message: string;
}

export const chatbotService = {
  sendMessage: (data: SendMessageRequest): Promise<{
    response: string;
    message_id: string;
  }> => chatbotApi.post("/chat/", data),

  getChatHistory: (limit?: number): Promise<ChatMessage[]> =>
    chatbotApi.get("/history/", { params: { limit } }),

  clearHistory: (): Promise<void> =>
    chatbotApi.delete("/history/"),

  getHealthAdvice: (symptoms: string[]): Promise<{
    advice: string;
    recommendations: string[];
  }> => chatbotApi.post("/health-advice/", { symptoms }),

  checkDrugInteractions: (medications: string[]): Promise<{
    interactions: any[];
    warnings: string[];
  }> => chatbotApi.post("/drug-interactions/", { medications }),
};