import { billingApi } from "./apiClient";
import { Bill } from "../types";

export interface CreateBillRequest {
  patient_id: string;
  appointment_id?: string;
  amount: number;
  description: string;
  due_date: string;
}

export const billingService = {
  getBills: (params?: {
    page?: number;
    status?: string;
    patient_id?: string;
  }): Promise<{
    results: Bill[];
    count: number;
    next?: string;
    previous?: string;
  }> => billingApi.get("/", { params }),

  createBill: (data: CreateBillRequest): Promise<Bill> =>
    billingApi.post("/", data),

  getBillById: (id: string): Promise<Bill> =>
    billingApi.get(`/${id}/`),

  payBill: (id: string, paymentMethod: string): Promise<Bill> =>
    billingApi.post(`/${id}/pay/`, { payment_method: paymentMethod }),

  getMyBills: (status?: string): Promise<Bill[]> =>
    billingApi.get("/my-bills/", { params: { status } }),

  processInsuranceClaim: (billId: string, insuranceInfo: any): Promise<any> =>
    billingApi.post(`/${billId}/insurance-claim/`, insuranceInfo),
};