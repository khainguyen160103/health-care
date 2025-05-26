import { appointmentApi } from "./apiClient";
import { Appointment } from "../types";

export interface CreateAppointmentRequest {
  doctor_id: string;
  scheduled_time: string;
  note?: string;
}

export interface UpdateAppointmentRequest {
  scheduled_time?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  note?: string;
}

export const appointmentService = {
  getAppointments: (params?: {
    page?: number;
    status?: string;
    date?: string;
    patient_id?: string;
    doctor_id?: string;
  }): Promise<{
    results: Appointment[];
    count: number;
    next?: string;
    previous?: string;
  }> => appointmentApi.get("/", { params }),

  createAppointment: (data: CreateAppointmentRequest): Promise<Appointment> =>
    appointmentApi.post("/", data),

  updateAppointment: (id: string, data: UpdateAppointmentRequest): Promise<Appointment> =>
    appointmentApi.put(`/${id}/`, data),

  deleteAppointment: (id: string): Promise<void> =>
    appointmentApi.delete(`/${id}/`),

  getAppointmentById: (id: string): Promise<Appointment> =>
    appointmentApi.get(`/${id}/`),

  confirmAppointment: (id: string): Promise<Appointment> =>
    appointmentApi.put(`/${id}/`, { status: 'confirmed' }),

  cancelAppointment: (id: string): Promise<Appointment> =>
    appointmentApi.put(`/${id}/`, { status: 'cancelled' }),

  completeAppointment: (id: string): Promise<Appointment> =>
    appointmentApi.put(`/${id}/`, { status: 'completed' }),
};
