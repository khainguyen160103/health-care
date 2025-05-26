import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { billingService } from "../services";

export const useBills = (params?: {
  page?: number;
  status?: string;
  patient_id?: string;
}) => {
  return useQuery({
    queryKey: ["bills", params],
    queryFn: () => billingService.getBills(params),
    // keepPreviousData: true,
  });
};

export const useBill = (id: string) => {
  return useQuery({
    queryKey: ["bill", id],
    queryFn: () => billingService.getBillById(id),
    enabled: !!id,
  });
};

export const useCreateBill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: billingService.createBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

export const usePayBill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      paymentMethod,
    }: {
      id: string;
      paymentMethod: string;
    }) => billingService.payBill(id, paymentMethod),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

export const useMyBills = (status?: string) => {
  return useQuery({
    queryKey: ["my-bills", status],
    queryFn: () => billingService.getMyBills(status),
  });
};

export const useProcessInsuranceClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      billId,
      insuranceInfo,
    }: {
      billId: string;
      insuranceInfo: any;
    }) => billingService.processInsuranceClaim(billId, insuranceInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
