import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { DollarLineIcon } from "../../icons";

interface Payment {
  id: number;
  billNumber: string;
  prescriptionNumber: string;
  patient: string;
  medications: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  date: string;
  status: string;
}

export default function PharmacyPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const payments: Payment[] = [
    {
      id: 1,
      billNumber: "PT001",
      prescriptionNumber: "DT001",
      patient: "Nguyễn Văn A",
      medications: [
        { name: "Paracetamol 500mg", quantity: 20, price: 500 },
        { name: "Amoxicillin 250mg", quantity: 21, price: 1200 },
      ],
      total: 35200,
      paymentMethod: "Tiền mặt",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      billNumber: "PT002",
      prescriptionNumber: "DT002",
      patient: "Trần Thị B",
      medications: [{ name: "Vitamin C 1000mg", quantity: 30, price: 800 }],
      total: 24000,
      paymentMethod: "Chuyển khoản",
      date: "2024-01-15",
      status: "pending",
    },
  ];

  const getStatusDisplayName = (status: string) => {
    const statusNames = {
      completed: "Hoàn Thành",
      pending: "Chờ Thanh Toán",
      cancelled: "Đã Hủy",
    };
    return statusNames[status as keyof typeof statusNames] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.prescriptionNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const todayStats = {
    totalPayments: payments.filter((p) => p.date === selectedDate).length,
    totalRevenue: payments
      .filter((p) => p.date === selectedDate && p.status === "completed")
      .reduce((sum, p) => sum + p.total, 0),
    pendingPayments: payments.filter(
      (p) => p.date === selectedDate && p.status === "pending"
    ).length,
    averageTransaction:
      payments.length > 0
        ? payments.reduce((sum, p) => sum + p.total, 0) / payments.length
        : 0,
  };

  return (
    <>
      <PageMeta
        title="Thanh Toán Nhà Thuốc | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý thanh toán thuốc"
      />
      <PageBreadcrumb pageTitle="Thanh Toán Nhà Thuốc" />

      <div className="space-y-6">
        {/* Daily Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ComponentCard title="Tổng Giao Dịch">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {todayStats.totalPayments}
                </p>
                <p className="text-sm text-gray-500">Hôm Nay</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-primary" />
            </div>
          </ComponentCard>

          <ComponentCard title="Doanh Thu">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">
                  {todayStats.totalRevenue.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-gray-500">Hôm Nay</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-success" />
            </div>
          </ComponentCard>

          <ComponentCard title="Chờ Thanh Toán">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">
                  {todayStats.pendingPayments}
                </p>
                <p className="text-sm text-gray-500">Giao Dịch</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-warning" />
            </div>
          </ComponentCard>

          <ComponentCard title="Trung Bình/GD">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-error">
                  {Math.round(todayStats.averageTransaction).toLocaleString(
                    "vi-VN"
                  )}
                  đ
                </p>
                <p className="text-sm text-gray-500">VNĐ</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-error" />
            </div>
          </ComponentCard>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm hóa đơn, bệnh nhân..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ngày</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <Button className="flex items-center space-x-2">
            <span>Báo Cáo Ngày</span>
          </Button>
        </div>

        {/* Payments Table */}
        <ComponentCard
          title={`Danh Sách Thanh Toán (${filteredPayments.length})`}
        >
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium">Số HĐ</th>
                  <th className="pb-3 font-medium">Đơn Thuốc</th>
                  <th className="pb-3 font-medium">Bệnh Nhân</th>
                  <th className="pb-3 font-medium">Thuốc</th>
                  <th className="pb-3 font-medium">Tổng Tiền</th>
                  <th className="pb-3 font-medium">PT Thanh Toán</th>
                  <th className="pb-3 font-medium">Trạng Thái</th>
                  <th className="pb-3 font-medium">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{payment.billNumber}</td>
                    <td className="py-3 text-blue-600">
                      {payment.prescriptionNumber}
                    </td>
                    <td className="py-3">{payment.patient}</td>
                    <td className="py-3">
                      <div className="text-sm">
                        {payment.medications.map((med, index) => (
                          <div key={index}>
                            {med.name} (x{med.quantity})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 font-medium text-green-600">
                      {payment.total.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="py-3">{payment.paymentMethod}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {getStatusDisplayName(payment.status)}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          In
                        </Button>
                        {payment.status === "pending" && (
                          <Button size="sm">Thanh Toán</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
