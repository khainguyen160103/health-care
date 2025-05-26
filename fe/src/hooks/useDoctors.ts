import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorService } from "../services";

export const useDoctors = (params?: {
  page?: number;
  specialization?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => doctorService.getDoctors(params),
    // keepPreviousData: true,
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => doctorService.getDoctorById(id),
    enabled: !!id,
  });
};

export const useDoctorProfile = () => {
  return useQuery({
    queryKey: ["doctor", "profile"],
    queryFn: doctorService.getProfile,
  });
};

export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: doctorService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["doctor", "profile"], data);
    },
  });
};

export const useDoctorAppointments = (params?: {
  date?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["doctor", "appointments", params],
    queryFn: () => doctorService.getMyAppointments(params),
  });
};

export const useDoctorSchedule = (date?: string) => {
  return useQuery({
    queryKey: ["doctor", "schedule", date],
    queryFn: () => doctorService.getSchedule(date),
  });
};
