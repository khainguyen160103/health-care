import { pharmacyApi } from "./apiClient";
import { Prescription } from "../types";

export interface CreatePrescriptionRequest {
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface UpdatePrescriptionRequest {
  status?: 'pending' | 'dispensed' | 'completed';
  instructions?: string;
}

export const pharmacyService = {
  getPrescriptions: (params?: {
    page?: number;
    status?: string;
    patient_id?: string;
  }): Promise<{
    results: Prescription[];
    count: number;
    next?: string;
    previous?: string;
  }> => pharmacyApi.get("/", { params }),

  createPrescription: (data: CreatePrescriptionRequest): Promise<Prescription> =>
    pharmacyApi.post("/", data),

  updatePrescription: (id: string, data: UpdatePrescriptionRequest): Promise<Prescription> =>
    pharmacyApi.put(`/${id}/`, data),

  getPrescriptionById: (id: string): Promise<Prescription> =>
    pharmacyApi.get(`/${id}/`),

  dispensePrescription: (id: string): Promise<Prescription> =>
    pharmacyApi.put(`/${id}/dispense/`),

  getPendingPrescriptions: (): Promise<Prescription[]> =>
    pharmacyApi.get("/pending/"),

  getInventory: (): Promise<any[]> =>
    pharmacyApi.get("/inventory/"),

  updateStock: (medicationId: string, quantity: number): Promise<any> =>
    pharmacyApi.put(`/inventory/${medicationId}/`, { quantity }),
};