import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { EyeIcon } from "../../icons";

interface Prescription {
  id: number;
  prescriptionNumber: string;
  patient: string;
  doctor: string;
  date: string;
  medications: Array<{
    name: string;
    dosage: string;
    quantity: number;
    instructions: string;
    inStock: boolean;
  }>;
  status: string;
  totalAmount: number;
}

export default function PrescriptionVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const prescriptions: Prescription[] = [
    {
      id: 1,
      prescriptionNumber: "DT001",
      patient: "Nguyễn Văn A",
      doctor: "BS. Trần Thị B",
      date: "2024-01-15",
      medications: [
        {
          name: "Paracetamol 500mg",
          dosage: "500mg",
          quantity: 20,
          instructions: "Uống 2 viên/lần, 3 lần/ngày sau ăn",
          inStock: true,
        },
        {
          name: "Amoxicillin 250mg",
          dosage: "250mg",
          quantity: 21,
          instructions: "Uống 1 viên/lần, 3 lần/ngày trước ăn",
          inStock: true,
        },
      ],
      status: "pending",
      totalAmount: 125000,
    },
    {
      id: 2,
      prescriptionNumber: "DT002",
      patient: "Lê Văn C",
      doctor: "BS. Nguyễn Văn D",
      date: "2024-01-15",
      medications: [
        {
          name: "Vitamin C 1000mg",
          dosage: "1000mg",
          quantity: 30,
          instructions: "Uống 1 viên/ngày sau ăn sáng",
          inStock: false,
        },
      ],
      status: "verified",
      totalAmount: 85000,
    },
  ];

  const getStatusDisplayName = (status: string) => {
    const statusNames = {
      pending: "Chờ Xử Lý",
      verified: "Đã Xác Minh",
      dispensed: "Đã Cấp Thuốc",
      rejected: "Từ Chối",
    };
    return statusNames[status as keyof typeof statusNames] || status;
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.prescriptionNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || prescription.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageMeta
        title="Xác Minh Đơn Thuốc | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Xác minh và xử lý đơn thuốc"
      />
      <PageBreadcrumb pageTitle="Xác Minh Đơn Thuốc" />

      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Tất Cả Trạng Thái</option>
              <option value="pending">Chờ Xử Lý</option>
              <option value="verified">Đã Xác Minh</option>
              <option value="dispensed">Đã Cấp Thuốc</option>
              <option value="rejected">Từ Chối</option>
            </select>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <ComponentCard
              key={prescription.id}
              title={`Đơn Thuốc ${prescription.prescriptionNumber}`}
            >
              <div className="space-y-4">
                {/* Header Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">
                      {prescription.patient}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Bác sĩ: {prescription.doctor}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ngày kê:{" "}
                      {new Date(prescription.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        prescription.status === "verified"
                          ? "bg-green-100 text-green-800"
                          : prescription.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : prescription.status === "dispensed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getStatusDisplayName(prescription.status)}
                    </span>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      {prescription.totalAmount.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <h5 className="font-medium mb-2">Danh Sách Thuốc:</h5>
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg ${
                          med.inStock
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-medium">{med.name}</h6>
                            <p className="text-sm text-gray-600">
                              Liều lượng: {med.dosage} • Số lượng:{" "}
                              {med.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              Hướng dẫn: {med.instructions}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              med.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {med.inStock ? "Có Sẵn" : "Hết Hàng"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {prescription.status === "pending" && (
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button className="flex items-center space-x-2">
                      <span>Xác Minh & Chuẩn Bị</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 text-red-600"
                    >
                      <span>Từ Chối</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>Xem Chi Tiết</span>
                    </Button>
                  </div>
                )}

                {prescription.status === "verified" && (
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button className="flex items-center space-x-2">
                      <span>Cấp Thuốc</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>Xem Chi Tiết</span>
                    </Button>
                  </div>
                )}
              </div>
            </ComponentCard>
          ))}
        </div>

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy đơn thuốc nào</p>
          </div>
        )}
      </div>
    </>
  );
}
