import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import { DollarLineIcon } from "../../icons";

export default function PharmacyDashboard() {
  // Mock data with more detailed information
  const stats = {
    pendingPrescriptions: 23,
    lowStockItems: 12,
    todayRevenue: 18750000,
    totalMedications: 650,
    completedToday: 47,
    avgProcessingTime: 15, // minutes
  };

  const recentPrescriptions = [
    {
      id: 1,
      prescriptionNumber: "DT001",
      patient: "Nguyễn Văn A",
      doctor: "BS. Trần Thị B",
      status: "pending",
      date: "2024-01-15",
      medications: [
        { name: "Paracetamol 500mg", quantity: 20, unit: "viên" },
        { name: "Amoxicillin 250mg", quantity: 12, unit: "viên" },
      ],
      priority: "urgent",
      totalAmount: 350000,
    },
    {
      id: 2,
      prescriptionNumber: "DT002",
      patient: "Lê Văn C",
      doctor: "BS. Nguyễn Văn D",
      status: "ready",
      date: "2024-01-15",
      medications: [
        { name: "Vitamin C 1000mg", quantity: 30, unit: "viên" },
        { name: "Omeprazole 20mg", quantity: 14, unit: "viên" },
      ],
      priority: "normal",
      totalAmount: 275000,
    },
    {
      id: 3,
      prescriptionNumber: "DT003",
      patient: "Trần Thị E",
      doctor: "BS. Phạm Văn F",
      status: "dispensed",
      date: "2024-01-15",
      medications: [{ name: "Metformin 500mg", quantity: 60, unit: "viên" }],
      priority: "normal",
      totalAmount: 420000,
    },
    {
      id: 4,
      prescriptionNumber: "DT004",
      patient: "Hoàng Văn G",
      doctor: "BS. Lê Thị H",
      status: "pending",
      date: "2024-01-15",
      medications: [
        { name: "Lisinopril 10mg", quantity: 30, unit: "viên" },
        { name: "Atorvastatin 20mg", quantity: 30, unit: "viên" },
      ],
      priority: "normal",
      totalAmount: 650000,
    },
  ];

  const lowStockItems = [
    {
      name: "Paracetamol 500mg",
      stock: 50,
      minStock: 100,
      supplier: "Công ty Dược A",
      category: "Giảm đau",
    },
    {
      name: "Amoxicillin 250mg",
      stock: 25,
      minStock: 80,
      supplier: "Công ty Dược B",
      category: "Kháng sinh",
    },
    {
      name: "Vitamin C 1000mg",
      stock: 15,
      minStock: 50,
      supplier: "Công ty Dược C",
      category: "Vitamin",
    },
    {
      name: "Insulin Glargine",
      stock: 8,
      minStock: 20,
      supplier: "Công ty Dược D",
      category: "Tiểu đường",
    },
    {
      name: "Omeprazole 20mg",
      stock: 35,
      minStock: 60,
      supplier: "Công ty Dược A",
      category: "Tiêu hóa",
    },
  ];

  const topSellingMedications = [
    { name: "Paracetamol 500mg", sold: 450, revenue: 2250000 },
    { name: "Vitamin C 1000mg", sold: 320, revenue: 1600000 },
    { name: "Amoxicillin 250mg", sold: 280, revenue: 2800000 },
    { name: "Omeprazole 20mg", sold: 210, revenue: 1680000 },
    { name: "Metformin 500mg", sold: 180, revenue: 1260000 },
  ];

  const revenueByHour = [
    { hour: "08:00", revenue: 850000 },
    { hour: "09:00", revenue: 1200000 },
    { hour: "10:00", revenue: 1650000 },
    { hour: "11:00", revenue: 2100000 },
    { hour: "12:00", revenue: 1800000 },
    { hour: "13:00", revenue: 1450000 },
    { hour: "14:00", revenue: 1950000 },
    { hour: "15:00", revenue: 2250000 },
    { hour: "16:00", revenue: 1900000 },
    { hour: "17:00", revenue: 1550000 },
  ];

  return (
    <>
      <PageMeta
        title="Bảng Điều Khiển Dược Sĩ | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Bảng điều khiển quản lý nhà thuốc"
      />
      <PageBreadcrumb pageTitle="Bảng Điều Khiển Dược Sĩ" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <ComponentCard title="Đơn Thuốc Chờ Xử Lý">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {stats.pendingPrescriptions}
              </p>
              <p className="text-sm text-gray-500">Đơn Thuốc</p>
            </div>
            {/* <ClipboardIcon className="h-8 w-8 text-primary" /> */}
          </div>
        </ComponentCard>

        <ComponentCard title="Thuốc Sắp Hết">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-warning">
                {stats.lowStockItems}
              </p>
              <p className="text-sm text-gray-500">Loại Thuốc</p>
            </div>
            {/* <BellIcon className="h-8 w-8 text-warning" /> */}
          </div>
        </ComponentCard>

        <ComponentCard title="Doanh Thu Hôm Nay">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-success">
                {stats.todayRevenue.toLocaleString("vi-VN")}đ
              </p>
              <p className="text-sm text-gray-500">VNĐ</p>
            </div>
            <DollarLineIcon className="h-8 w-8 text-success" />
          </div>
        </ComponentCard>

        <ComponentCard title="Tổng Loại Thuốc">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-error">
                {stats.totalMedications}
              </p>
              <p className="text-sm text-gray-500">Loại Thuốc</p>
            </div>
            {/* <PackageIcon className="h-8 w-8 text-error" /> */}
          </div>
        </ComponentCard>
      </div>

      {/* Recent Prescriptions */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComponentCard title="Đơn Thuốc Gần Đây">
          <div className="space-y-4">
            {recentPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {prescription.prescriptionNumber}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        prescription.priority === "urgent"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {prescription.priority === "urgent"
                        ? "Khẩn cấp"
                        : "Bình thường"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bệnh nhân: {prescription.patient}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bác sĩ: {prescription.doctor}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Số loại thuốc: {prescription.medications.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {prescription.totalAmount.toLocaleString("vi-VN")}đ
                  </p>
                  <p className="text-sm text-gray-500">
                    {prescription.date}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      prescription.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : prescription.status === "ready"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {prescription.status === "pending"
                      ? "Chờ xử lý"
                      : prescription.status === "ready"
                      ? "Sẵn sàng"
                      : "Đã cấp"}
                  </span>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Link to="/pharmacy/prescriptions">
                <Button variant="outline" size="sm">
                  Xem Tất Cả Đơn Thuốc
                </Button>
              </Link>
            </div>
          </div>
        </ComponentCard>

        {/* Top Selling Medications */}
        <ComponentCard title="Thuốc Bán Chạy">
          <div className="space-y-4">
            {topSellingMedications.map((med, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {med.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Đã bán: {med.sold} viên
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {med.revenue.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Low Stock Items */}
      <div className="mt-6">
        <ComponentCard title="Thuốc Sắp Hết Hàng - Cần Nhập Thêm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Tên Thuốc</th>
                  <th className="px-4 py-2 text-left">Tồn Kho</th>
                  <th className="px-4 py-2 text-left">Mức Tối Thiểu</th>
                  <th className="px-4 py-2 text-left">Nhà Cung Cấp</th>
                  <th className="px-4 py-2 text-left">Phân Loại</th>
                  <th className="px-4 py-2 text-left">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 font-medium">{item.name}</td>
                    <td className="px-4 py-2">
                      <span className={`font-bold ${
                        item.stock < 20 ? 'text-red-600' : 
                        item.stock < 40 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.minStock}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{item.supplier}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.stock < 20 ? 'bg-red-100 text-red-800' :
                        item.stock < 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.stock < 20 ? 'Rất ít' : 
                         item.stock < 40 ? 'Sắp hết' : 'Đủ'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center pt-4">
            <Link to="/pharmacy/stock-management">
              <Button variant="outline" size="sm">
                Quản Lý Kho Thuốc
              </Button>
            </Link>
          </div>
        </ComponentCard>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <ComponentCard title="Thao Tác Nhanh">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/pharmacy/prescription-verification">
              <Button className="w-full">Xác Thực Đơn Thuốc</Button>
            </Link>
            <Link to="/pharmacy/stock-management">
              <Button variant="outline" className="w-full">
                Quản Lý Kho
              </Button>
            </Link>
            <Link to="/pharmacy/payments">
              <Button variant="outline" className="w-full">
                Thanh Toán
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Báo Cáo Doanh Thu
            </Button>
          </div>
        </ComponentCard>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="mt-6">
        <ComponentCard title="Doanh Thu Theo Giờ Hôm Nay">
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Biểu đồ doanh thu theo giờ</p>
              <div className="grid grid-cols-5 gap-2 text-sm">
                {revenueByHour.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500">{item.hour}</div>
                    <div className="font-semibold text-blue-600">
                      {(item.revenue / 1000000).toFixed(1)}M
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tổng: {stats.todayRevenue.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
