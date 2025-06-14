import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { laboratoryService, UpdateLabTestRequest } from "../services";

// Mock data for development/demo purposes
const MOCK_LAB_TESTS = {
  results: [
    {
      id: "1",
      test_number: "XN001",
      patient_info: { name: "Nguyễn Văn A", phone: "0901234567" },
      doctor_info: { name: "BS. Trần Thị B", department: "Nội khoa" },
      test_type: "Công thức máu",
      priority: "urgent",
      status: "pending",
      requested_time: "2024-01-15T09:30:00Z",
      sample_type: "Máu tĩnh mạch",
      estimated_time: 30,
      results: null,
    },
    {
      id: "2",
      test_number: "XN002",
      patient_info: { name: "Lê Văn C", phone: "0907654321" },
      doctor_info: { name: "BS. Nguyễn Văn D", department: "Tim mạch" },
      test_type: "Sinh hóa máu",
      priority: "urgent",
      status: "in-progress",
      requested_time: "2024-01-15T10:15:00Z",
      sample_type: "Máu tĩnh mạch",
      estimated_time: 60,
      results: null,
    },
    {
      id: "3",
      test_number: "XN003",
      patient_info: { name: "Trần Thị E", phone: "0912345678" },
      doctor_info: { name: "BS. Phạm Văn F", department: "Tiết niệu" },
      test_type: "Nước tiểu",
      priority: "normal",
      status: "completed",
      requested_time: "2024-01-15T08:45:00Z",
      sample_type: "Nước tiểu giữa dòng",
      estimated_time: 20,
      results: "Bình thường, không có protein, glucose âm tính",
    },
    {
      id: "4",
      test_number: "XN004",
      patient_info: { name: "Hoàng Văn G", phone: "0923456789" },
      doctor_info: { name: "BS. Lê Thị H", department: "Hô hấp" },
      test_type: "X-Ray ngực",
      priority: "normal",
      status: "pending",
      requested_time: "2024-01-15T11:00:00Z",
      sample_type: "Hình ảnh",
      estimated_time: 15,
      results: null,
    },
    {
      id: "5",
      test_number: "XN005",
      patient_info: { name: "Phạm Thị I", phone: "0934567890" },
      doctor_info: { name: "BS. Võ Văn J", department: "Nhiễm khuẩn" },
      test_type: "HIV Test",
      priority: "urgent",
      status: "in-progress",
      requested_time: "2024-01-15T10:45:00Z",
      sample_type: "Máu tĩnh mạch",
      estimated_time: 90,
      results: null,
    },
  ],
  count: 32,
  next: null,
  previous: null,
};

export const useLabTests = (params?: {
  page?: number;
  status?: string;
  patient_id?: string;
  date?: string;
}) => {
  return useQuery({
    queryKey: ["lab-tests", params],
    queryFn: async () => {
      try {
        return await laboratoryService.getLabTests(params);
      } catch (error) {
        console.log("API not available, using mock lab tests data");
        // Filter mock data based on params if needed
        let filteredResults = MOCK_LAB_TESTS.results;
        if (params?.status) {
          filteredResults = filteredResults.filter(
            (t) => t.status === params.status
          );
        }
        return { ...MOCK_LAB_TESTS, results: filteredResults };
      }
    },
    // keepPreviousData: true,
  });
};

export const useLabTest = (id: string) => {
  return useQuery({
    queryKey: ["lab-test", id],
    queryFn: async () => {
      try {
        return await laboratoryService.getLabTestById(id);
      } catch (error) {
        console.log("API not available, using mock lab test data");
        return MOCK_LAB_TESTS.results.find((t) => t.id === id) || null;
      }
    },
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
    queryFn: async () => {
      try {
        return await laboratoryService.getMyTests(params);
      } catch (error) {
        console.log("API not available, using mock my lab tests data");
        let filteredResults = MOCK_LAB_TESTS.results;
        if (params?.status) {
          filteredResults = filteredResults.filter(
            (t) => t.status === params.status
          );
        }
        return filteredResults;
      }
    },
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
