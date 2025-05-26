import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pharmacyService, UpdatePrescriptionRequest } from "../services";

export const usePrescriptions = (params?: {
  page?: number;
  status?: string;
  patient_id?: string;
}) => {
  return useQuery({
    queryKey: ["prescriptions", params],
    queryFn: () => pharmacyService.getPrescriptions(params),
    // keepPreviousData: true,
  });
};

export const usePrescription = (id: string) => {
  return useQuery({
    queryKey: ["prescription", id],
    queryFn: () => pharmacyService.getPrescriptionById(id),
    enabled: !!id,
  });
};

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pharmacyService.createPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
};

export const useUpdatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePrescriptionRequest;
    }) => pharmacyService.updatePrescription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
};

export const useDispensePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pharmacyService.dispensePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
};

export const usePendingPrescriptions = () => {
  return useQuery({
    queryKey: ["prescriptions", "pending"],
    queryFn: pharmacyService.getPendingPrescriptions,
  });
};

export const useInventory = () => {
  return useQuery({
    queryKey: ["pharmacy", "inventory"],
    queryFn: pharmacyService.getInventory,
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      medicationId,
      quantity,
    }: {
      medicationId: string;
      quantity: number;
    }) => pharmacyService.updateStock(medicationId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacy", "inventory"] });
    },
  });
};
