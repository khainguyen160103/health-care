import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import { DollarLineIcon } from "../../icons";

export default function PharmacyDashboard() {
  const stats = {
    pendingPrescriptions: 15,
    lowStockItems: 8,
    todayRevenue: 12500000,
    totalMedications: 450,
  };

  const recentPrescriptions = [
    {
      id: 1,
      prescriptionNumber: "DT001",
      patient: "Nguyễn Văn A",
      doctor: "BS. Trần Thị B",
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: 2,
      prescriptionNumber: "DT002",
      patient: "Lê Văn C",
      doctor: "BS. Nguyễn Văn D",
      status: "ready",
      date: "2024-01-15",
    },
  ];

  const lowStockItems = [
    { name: "Paracetamol 500mg", stock: 50, minStock: 100 },
    { name: "Amoxicillin 250mg", stock: 25, minStock: 80 },
    { name: "Vitamin C 1000mg", stock: 15, minStock: 50 },
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
      <div className="mt-6">
        <ComponentCard title="Đơn Thuốc Gần Đây">
          <div className="space-y-4">
            {recentPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {prescription.prescriptionNumber}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bệnh nhân: {prescription.patient}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bác sĩ: {prescription.doctor}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(prescription.date).toLocaleDateString("vi-VN")}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      prescription.status === "ready"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {prescription.status === "ready"
                      ? "Sẵn Sàng"
                      : prescription.status === "pending"
                      ? "Chờ Xử Lý"
                      : prescription.status === "dispensed"
                      ? "Đã Cấp"
                      : prescription.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Low Stock Alert */}
      <div className="mt-6">
        <ComponentCard title="Cảnh Báo Thuốc Sắp Hết">
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-red-800">{item.name}</h4>
                  <p className="text-sm text-red-600">
                    Còn lại: {item.stock} • Tối thiểu: {item.minStock}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200"
                >
                  Đặt Hàng
                </Button>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Thao Tác Nhanh
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/pharmacy/prescription-verification">
            <Button className="w-full">Xác Minh Đơn Thuốc</Button>
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
          <Link to="/pharmacy/reports">
            <Button variant="outline" className="w-full">
              Báo Cáo
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
