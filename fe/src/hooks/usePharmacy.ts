import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pharmacyService, UpdatePrescriptionRequest } from "../services";

// Mock data for development/demo purposes
const MOCK_PRESCRIPTIONS = {
  results: [
    {
      id: "1",
      prescription_number: "DT001",
      patient_info: { name: "Nguyễn Văn A", phone: "0901234567" },
      doctor_info: { name: "BS. Trần Thị B", department: "Nội khoa" },
      status: "pending",
      created_at: "2024-01-15T09:30:00Z",
      medications: [
        { name: "Paracetamol 500mg", quantity: 20, unit: "viên", instructions: "Uống sau ăn" },
        { name: "Amoxicillin 250mg", quantity: 12, unit: "viên", instructions: "Uống trước ăn 30 phút" }
      ],
      priority: "urgent",
      total_amount: 350000,
    },
    {
      id: "2", 
      prescription_number: "DT002",
      patient_info: { name: "Lê Văn C", phone: "0907654321" },
      doctor_info: { name: "BS. Nguyễn Văn D", department: "Tim mạch" },
      status: "ready",
      created_at: "2024-01-15T10:15:00Z",
      medications: [
        { name: "Vitamin C 1000mg", quantity: 30, unit: "viên", instructions: "Uống sau ăn sáng" },
        { name: "Omeprazole 20mg", quantity: 14, unit: "viên", instructions: "Uống trước ăn 30 phút" }
      ],
      priority: "normal",
      total_amount: 275000,
    },
    {
      id: "3",
      prescription_number: "DT003", 
      patient_info: { name: "Trần Thị E", phone: "0912345678" },
      doctor_info: { name: "BS. Phạm Văn F", department: "Tiểu đường" },
      status: "dispensed",
      created_at: "2024-01-15T08:45:00Z",
      medications: [
        { name: "Metformin 500mg", quantity: 60, unit: "viên", instructions: "Uống cùng bữa ăn" }
      ],
      priority: "normal",
      total_amount: 420000,
    },
  ],
  count: 15,
  next: null,
  previous: null,
};

const MOCK_INVENTORY = [
  { 
    id: "1", 
    name: "Paracetamol 500mg", 
    stock: 50, 
    min_stock: 100, 
    supplier: "Công ty Dược A", 
    category: "Giảm đau",
    price: 5000,
    expiry_date: "2025-12-31"
  },
  { 
    id: "2", 
    name: "Amoxicillin 250mg", 
    stock: 25, 
    min_stock: 80, 
    supplier: "Công ty Dược B", 
    category: "Kháng sinh",
    price: 8000,
    expiry_date: "2025-06-30"
  },
  { 
    id: "3", 
    name: "Vitamin C 1000mg", 
    stock: 15, 
    min_stock: 50, 
    supplier: "Công ty Dược C", 
    category: "Vitamin",  
    price: 3000,
    expiry_date: "2025-03-15"
  },
  { 
    id: "4", 
    name: "Insulin Glargine", 
    stock: 8, 
    min_stock: 20, 
    supplier: "Công ty Dược D", 
    category: "Tiểu đường",
    price: 150000,
    expiry_date: "2024-11-30"
  },
  { 
    id: "5", 
    name: "Omeprazole 20mg", 
    stock: 35, 
    min_stock: 60, 
    supplier: "Công ty Dược A", 
    category: "Tiêu hóa",
    price: 12000,
    expiry_date: "2025-08-20"
  },
];

export const usePrescriptions = (params?: {
  page?: number;
  status?: string;
  patient_id?: string;
}) => {
  return useQuery({
    queryKey: ["prescriptions", params],
    queryFn: async () => {
      try {
        return await pharmacyService.getPrescriptions(params);
      } catch (error) {
        console.log("API not available, using mock data");
        // Filter mock data based on params if needed
        let filteredResults = MOCK_PRESCRIPTIONS.results;
        if (params?.status) {
          filteredResults = filteredResults.filter(p => p.status === params.status);
        }
        return { ...MOCK_PRESCRIPTIONS, results: filteredResults };
      }
    },
    // keepPreviousData: true,
  });
};

export const useInventory = () => {
  return useQuery({
    queryKey: ["pharmacy", "inventory"],
    queryFn: async () => {
      try {
        return await pharmacyService.getInventory();
      } catch (error) {
        console.log("API not available, using mock inventory data");
        return MOCK_INVENTORY;
      }
    },
  });
};

export const usePendingPrescriptions = () => {
  return useQuery({
    queryKey: ["prescriptions", "pending"],
    queryFn: async () => {
      try {
        return await pharmacyService.getPendingPrescriptions();
      } catch (error) {
        console.log("API not available, using mock pending prescriptions");
        return MOCK_PRESCRIPTIONS.results.filter(p => p.status === 'pending');
      }
    },
  });
};

export const usePrescription = (id: string) => {
  return useQuery({
    queryKey: ["prescription", id],
    queryFn: async () => {
      try {
        return await pharmacyService.getPrescriptionById(id);
      } catch (error) {
        console.log("API not available, using mock prescription data");
        return MOCK_PRESCRIPTIONS.results.find(p => p.id === id) || null;
      }
    },
    enabled: !!id,
  });
};

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pharmacyService.createPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
};

export const useUpdatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePrescriptionRequest;
    }) => pharmacyService.updatePrescription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
};

export const useDispensePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pharmacyService.dispensePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
};
