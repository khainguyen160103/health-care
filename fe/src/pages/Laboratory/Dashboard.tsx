import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

export default function LaboratoryDashboard() {
  const stats = {
    pendingTests: 25,
    completedToday: 42,
    urgentTests: 8,
    equipmentIssues: 2,
  };

  const recentTests = [
    {
      id: 1,
      testNumber: "XN001",
      patient: "Nguyễn Văn A",
      testType: "Công thức máu",
      priority: "Bình thường",
      status: "pending",
      requestedTime: "2024-01-15 09:30",
      doctor: "BS. Trần Thị B",
    },
    {
      id: 2,
      testNumber: "XN002",
      patient: "Lê Văn C",
      testType: "Sinh hóa máu",
      priority: "Khẩn cấp",
      status: "in-progress",
      requestedTime: "2024-01-15 10:15",
      doctor: "BS. Nguyễn Văn D",
    },
    {
      id: 3,
      testNumber: "XN003",
      patient: "Trần Thị E",
      testType: "Nước tiểu",
      priority: "Bình thường",
      status: "completed",
      requestedTime: "2024-01-15 08:45",
      doctor: "BS. Phạm Văn F",
    },
  ];

  const equipmentStatus = [
    {
      name: "Máy xét nghiệm máu tự động",
      status: "normal",
      lastMaintenance: "2024-01-10",
    },
    {
      name: "Kính hiển vi",
      status: "maintenance",
      lastMaintenance: "2024-01-05",
    },
    {
      name: "Máy ly tâm",
      status: "normal",
      lastMaintenance: "2024-01-12",
    },
  ];

  return (
    <>
      <PageMeta
        title="Bảng Điều Khiển Phòng Xét Nghiệm | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Bảng điều khiển quản lý phòng xét nghiệm"
      />
      <PageBreadcrumb pageTitle="Bảng Điều Khiển Phòng Xét Nghiệm" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <ComponentCard title="Xét Nghiệm Chờ Xử Lý">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {stats.pendingTests}
              </p>
              <p className="text-sm text-gray-500">Mẫu Chờ</p>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Hoàn Thành Hôm Nay">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-success">
                {stats.completedToday}
              </p>
              <p className="text-sm text-gray-500">Xét Nghiệm</p>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Xét Nghiệm Khẩn Cấp">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-warning">
                {stats.urgentTests}
              </p>
              <p className="text-sm text-gray-500">Ưu Tiên Cao</p>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Thiết Bị Có Vấn Đề">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-error">
                {stats.equipmentIssues}
              </p>
              <p className="text-sm text-gray-500">Thiết Bị</p>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Recent Tests */}
      <div className="mt-6">
        <ComponentCard title="Xét Nghiệm Gần Đây">
          <div className="space-y-4">
            {recentTests.map((test) => (
              <div
                key={test.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {test.testNumber} - {test.testType}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bệnh nhân: {test.patient}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bác sĩ yêu cầu: {test.doctor}
                  </p>
                  <p className="text-sm text-gray-500">
                    Thời gian: {test.requestedTime}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      test.priority === "Khẩn cấp"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {test.priority}
                  </span>
                  <br />
                  <span
                    className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                      test.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : test.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {test.status === "completed"
                      ? "Hoàn Thành"
                      : test.status === "in-progress"
                      ? "Đang Thực Hiện"
                      : test.status === "pending"
                      ? "Chờ Xử Lý"
                      : test.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Equipment Status */}
      <div className="mt-6">
        <ComponentCard title="Tình Trạng Thiết Bị">
          <div className="space-y-3">
            {equipmentStatus.map((equipment, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">
                    {equipment.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Bảo trì lần cuối:{" "}
                    {new Date(equipment.lastMaintenance).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    equipment.status === "normal"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {equipment.status === "normal"
                    ? "Hoạt Động Bình Thường"
                    : "Cần Bảo Trì"}
                </span>
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
          <Link to="/laboratory/test-management">
            <Button className="w-full">Quản Lý Xét Nghiệm</Button>
          </Link>
          <Link to="/laboratory/test-reports">
            <Button variant="outline" className="w-full">
              Báo Cáo Xét Nghiệm
            </Button>
          </Link>
          <Link to="/laboratory/equipment">
            <Button variant="outline" className="w-full">
              Quản Lý Thiết Bị
            </Button>
          </Link>
          <Link to="/laboratory/quality-control">
            <Button variant="outline" className="w-full">
              Kiểm Soát Chất Lượng
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
