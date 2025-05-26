import { doctorApi } from "./apiClient";
import { Doctor } from "../types";

export interface UpdateDoctorRequest {
  specialization?: string;
  phone?: string;
  years_of_experience?: number;
  bio?: string;
}

export const doctorService = {
  getDoctors: (params?: {
    page?: number;
    specialization?: string;
    search?: string;
  }): Promise<{
    results: Doctor[];
    count: number;
    next?: string;
    previous?: string;
  }> => doctorApi.get("/", { params }),

  getDoctorById: (id: string): Promise<Doctor> =>
    doctorApi.get(`/${id}/`),

  updateProfile: (data: UpdateDoctorRequest): Promise<Doctor> =>
    doctorApi.put("/profile/", data),

  getProfile: (): Promise<Doctor> =>
    doctorApi.get("/profile/"),

  // Get doctor's appointments
  getMyAppointments: (params?: {
    date?: string;
    status?: string;
  }): Promise<{
    results: any[];
    count: number;
  }> => doctorApi.get("/appointments/", { params }),

  // Get doctor's schedule
  getSchedule: (date?: string): Promise<any[]> =>
    doctorApi.get("/schedule/", { params: { date } }),
};