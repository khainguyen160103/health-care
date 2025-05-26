import { laboratoryApi } from "./apiClient";
import { LabTest } from "../types";

export interface CreateLabTestRequest {
  patient_id: string;
  test_name: string;
  test_type: string;
  scheduled_date: string;
  notes?: string;
}

export interface UpdateLabTestRequest {
  status?: 'ordered' | 'in_progress' | 'completed';
  results?: string;
  notes?: string;
}

export const laboratoryService = {
  getLabTests: (params?: {
    page?: number;
    status?: string;
    patient_id?: string;
    date?: string;
  }): Promise<{
    results: LabTest[];
    count: number;
    next?: string;
    previous?: string;
  }> => laboratoryApi.get("/", { params }),

  createLabTest: (data: CreateLabTestRequest): Promise<LabTest> =>
    laboratoryApi.post("/", data),

  updateLabTest: (id: string, data: UpdateLabTestRequest): Promise<LabTest> =>
    laboratoryApi.put(`/${id}/`, data),

  getLabTestById: (id: string): Promise<LabTest> =>
    laboratoryApi.get(`/${id}/`),

  deleteLabTest: (id: string): Promise<void> =>
    laboratoryApi.delete(`/${id}/`),

  getMyTests: (params?: {
    status?: string;
    date?: string;
  }): Promise<{
    results: LabTest[];
    count: number;
  }> => laboratoryApi.get("/my-tests/", { params }),

  uploadResults: (id: string, results: string): Promise<LabTest> =>
    laboratoryApi.put(`/${id}/results/`, { results }),
};