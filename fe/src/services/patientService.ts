import { patientApi } from "./apiClient";

export interface Patient {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  medical_history?: string;
  insurance_number?: string;
  created_at: string;
}

export interface UpdatePatientRequest {
  phone?: string;
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  medical_history?: string;
  insurance_number?: string;
}

export const patientService = {
  getPatients: (params?: {
    page?: number;
    search?: string;
  }): Promise<{
    results: Patient[];
    count: number;
    next?: string;
    previous?: string;
  }> => patientApi.get("/", { params }),

  getPatientById: (id: string): Promise<Patient> =>
    patientApi.get(`/${id}/`),

  updateProfile: (data: UpdatePatientRequest): Promise<Patient> =>
    patientApi.put("/profile/", data),

  getProfile: (): Promise<Patient> =>
    patientApi.get("/profile/"),

  // Get patient's appointments
  getMyAppointments: (params?: {
    status?: string;
    date?: string;
  }): Promise<{
    results: any[];
    count: number;
  }> => patientApi.get("/appointments/", { params }),

  // Get medical records
  getMedicalRecords: (): Promise<any[]> =>
    patientApi.get("/medical-records/"),

  // Get prescriptions
  getPrescriptions: (): Promise<any[]> =>
    patientApi.get("/prescriptions/"),
};