import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patientService } from "../services";

export const usePatients = (params?: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: () => patientService.getPatients(params),
    // keepPreviousData: true,
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => patientService.getPatientById(id),
    enabled: !!id,
  });
};

export const usePatientProfile = () => {
  return useQuery({
    queryKey: ["patient", "profile"],
    queryFn: patientService.getProfile,
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patientService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["patient", "profile"], data);
    },
  });
};

export const usePatientAppointments = (params?: {
  status?: string;
  date?: string;
}) => {
  return useQuery({
    queryKey: ["patient", "appointments", params],
    queryFn: () => patientService.getMyAppointments(params),
  });
};

export const usePatientMedicalRecords = () => {
  return useQuery({
    queryKey: ["patient", "medical-records"],
    queryFn: patientService.getMedicalRecords,
  });
};

export const usePatientPrescriptions = () => {
  return useQuery({
    queryKey: ["patient", "prescriptions"],
    queryFn: patientService.getPrescriptions,
  });
};
