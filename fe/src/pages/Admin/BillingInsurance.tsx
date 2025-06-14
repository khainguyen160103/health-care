import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

// SVG Icons components
const DollarLineIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

interface Bill {
  id: number;
  patientName: string;
  billNumber: string;
  amount: number;
  insuranceAmount: number;
  patientPayment: number;
  date: string;
  status: string;
  insuranceProvider: string;
}

export default function BillingInsurance() {
  const [selectedTab, setSelectedTab] = useState("bills");
  const [searchTerm, setSearchTerm] = useState("");

  const bills: Bill[] = [
    {
      id: 1,
      patientName: "Nguyễn Văn A",
      billNumber: "HD001",
      amount: 2500000,
      insuranceAmount: 2000000,
      patientPayment: 500000,
      date: "2024-01-15",
      status: "paid",
      insuranceProvider: "Bảo Hiểm Xã Hội",
    },
    {
      id: 2,
      patientName: "Trần Thị B",
      billNumber: "HD002",
      amount: 1800000,
      insuranceAmount: 1300000,
      patientPayment: 500000,
      date: "2024-01-14",
      status: "pending",
      insuranceProvider: "Bảo Hiểm Y Tế",
    },
  ];

  const getStatusDisplayName = (status: string) => {
    const statusNames = {
      paid: "Đã Thanh Toán",
      pending: "Chờ Thanh Toán",
      processing: "Đang Xử Lý",
      cancelled: "Đã Hủy",
    };
    return statusNames[status as keyof typeof statusNames] || status;
  };

  const totalStats = {
    totalBills: bills.length,
    totalAmount: bills.reduce((sum, bill) => sum + bill.amount, 0),
    totalInsurance: bills.reduce((sum, bill) => sum + bill.insuranceAmount, 0),
    totalPatientPayment: bills.reduce(
      (sum, bill) => sum + bill.patientPayment,
      0
    ),
  };

  return (
    <>
      <PageMeta
        title="Thanh Toán & Bảo Hiểm | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý thanh toán và bảo hiểm y tế"
      />
      <PageBreadcrumb pageTitle="Thanh Toán & Bảo Hiểm" />

      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ComponentCard title="Tổng Hóa Đơn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {totalStats.totalBills}
                </p>
                <p className="text-sm text-gray-500">Hóa Đơn</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-primary" />
            </div>
          </ComponentCard>

          <ComponentCard title="Tổng Tiền">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">
                  {totalStats.totalAmount.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-gray-500">VNĐ</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-warning" />
            </div>
          </ComponentCard>

          <ComponentCard title="Bảo Hiểm Chi Trả">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">
                  {totalStats.totalInsurance.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-gray-500">VNĐ</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-success" />
            </div>
          </ComponentCard>

          <ComponentCard title="Bệnh Nhân Trả">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-error">
                  {totalStats.totalPatientPayment.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-gray-500">VNĐ</p>
              </div>
              <DollarLineIcon className="h-8 w-8 text-error" />
            </div>
          </ComponentCard>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab("bills")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === "bills"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Hóa Đơn
            </button>
            <button
              onClick={() => setSelectedTab("insurance")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === "insurance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Bảo Hiểm
            </button>
            <button
              onClick={() => setSelectedTab("reports")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === "reports"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Báo Cáo
            </button>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative">
            {/* <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <DownloadIcon className="h-4 w-4" />
              <span>Xuất Báo Cáo</span>
            </Button>
          </div>
        </div>

        {/* Bills Table */}
        {selectedTab === "bills" && (
          <ComponentCard title="Danh Sách Hóa Đơn">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="pb-3 font-medium">Số Hóa Đơn</th>
                    <th className="pb-3 font-medium">Bệnh Nhân</th>
                    <th className="pb-3 font-medium">Tổng Tiền</th>
                    <th className="pb-3 font-medium">Bảo Hiểm</th>
                    <th className="pb-3 font-medium">Bệnh Nhân Trả</th>
                    <th className="pb-3 font-medium">Ngày</th>
                    <th className="pb-3 font-medium">Trạng Thái</th>
                    <th className="pb-3 font-medium">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill) => (
                    <tr key={bill.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{bill.billNumber}</td>
                      <td className="py-3">{bill.patientName}</td>
                      <td className="py-3 font-medium text-blue-600">
                        {bill.amount.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="py-3 text-green-600">
                        {bill.insuranceAmount.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="py-3 text-orange-600">
                        {bill.patientPayment.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="py-3 text-gray-600">
                        {new Date(bill.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            bill.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {getStatusDisplayName(bill.status)}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Xem
                          </Button>
                          <Button variant="outline" size="sm">
                            In
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ComponentCard>
        )}

        {/* Insurance Tab */}
        {selectedTab === "insurance" && (
          <ComponentCard title="Quản Lý Bảo Hiểm">
            <div className="text-center py-8">
              <p className="text-gray-500">
                Tính năng quản lý bảo hiểm đang được phát triển...
              </p>
            </div>
          </ComponentCard>
        )}

        {/* Reports Tab */}
        {selectedTab === "reports" && (
          <ComponentCard title="Báo Cáo Tài Chính">
            <div className="text-center py-8">
              <p className="text-gray-500">
                Tính năng báo cáo tài chính đang được phát triển...
              </p>
            </div>
          </ComponentCard>
        )}
      </div>
    </>
  );
}
