import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { laboratoryService, UpdateLabTestRequest } from "../services";

export const useLabTests = (params?: {
  page?: number;
  status?: string;
  patient_id?: string;
  date?: string;
}) => {
  return useQuery({
    queryKey: ["lab-tests", params],
    queryFn: () => laboratoryService.getLabTests(params),
    // keepPreviousData: true,
  });
};

export const useLabTest = (id: string) => {
  return useQuery({
    queryKey: ["lab-test", id],
    queryFn: () => laboratoryService.getLabTestById(id),
    enabled: !!id,
  });
};

export const useCreateLabTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: laboratoryService.createLabTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab-tests"] });
    },
  });
};

export const useUpdateLabTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLabTestRequest }) =>
      laboratoryService.updateLabTest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab-tests"] });
    },
  });
};

export const useMyLabTests = (params?: { status?: string; date?: string }) => {
  return useQuery({
    queryKey: ["my-lab-tests", params],
    queryFn: () => laboratoryService.getMyTests(params),
  });
};

export const useUploadLabResults = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, results }: { id: string; results: string }) =>
      laboratoryService.uploadResults(id, results),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab-tests"] });
      queryClient.invalidateQueries({ queryKey: ["my-lab-tests"] });
    },
  });
};
