import { User } from "./userType";
export interface AuthResponse {
  token: string;
  user: User;
}

export interface Patient extends User {
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  medical_history?: string;
  insurance_number?: string;
}

export interface Doctor extends User {
  specialization: string;
  license_number: string;
  years_of_experience?: number;
  bio?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  scheduled_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  note?: string;
  created_at: string;
  doctor_info?: Doctor;
  patient_info?: Patient;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id?: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  status: "pending" | "dispensed" | "completed";
  created_at: string;
}

export interface LabTest {
  id: string;
  patient_id: string;
  doctor_id: string;
  test_name: string;
  test_type: string;
  status: "ordered" | "in_progress" | "completed";
  results?: string;
  notes?: string;
  scheduled_date: string;
  created_at: string;
}

export interface Bill {
  id: string;
  patient_id: string;
  appointment_id?: string;
  amount: number;
  description: string;
  status: "pending" | "paid" | "overdue";
  due_date: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  created_at: string;
}
