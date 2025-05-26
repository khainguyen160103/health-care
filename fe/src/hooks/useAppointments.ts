import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService, UpdateAppointmentRequest } from "../services";

export const useAppointments = (params?: {
  page?: number;
  status?: string;
  date?: string;
}) => {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: () => appointmentService.getAppointments(params),
    // keepPreviousData: true, // Removed because it's not a valid option in this version
  });
};

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: () => appointmentService.getAppointmentById(id),
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateAppointmentRequest;
    }) => appointmentService.updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useConfirmAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.confirmAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
