import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatbotService } from "../services";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatbotService.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
};

export const useChatHistory = (limit?: number) => {
  return useQuery({
    queryKey: ["chat-history", limit],
    queryFn: () => chatbotService.getChatHistory(limit),
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatbotService.clearHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
};

export const useHealthAdvice = () => {
  return useMutation({
    mutationFn: chatbotService.getHealthAdvice,
  });
};

export const useCheckDrugInteractions = () => {
  return useMutation({
    mutationFn: chatbotService.checkDrugInteractions,
  });
};
