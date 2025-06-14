import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

export default function LaboratoryDashboard() {
  // Mock data with more detailed information
  const stats = {
    pendingTests: 32,
    completedToday: 58,
    urgentTests: 12,
    equipmentIssues: 3,
    avgTurnaroundTime: 45, // minutes
    totalSamples: 240,
  };

  const recentTests = [
    {
      id: 1,
      testNumber: "XN001",
      patient: "Nguyễn Văn A",
      testType: "Công thức máu",
      priority: "urgent",
      status: "pending",
      requestedTime: "2024-01-15 09:30",
      doctor: "BS. Trần Thị B",
      department: "Nội khoa",
      sampleType: "Máu tĩnh mạch",
      estimatedTime: "30 phút",
    },
    {
      id: 2,
      testNumber: "XN002",
      patient: "Lê Văn C",
      testType: "Sinh hóa máu",
      priority: "urgent",
      status: "in-progress",
      requestedTime: "2024-01-15 10:15",
      doctor: "BS. Nguyễn Văn D",
      department: "Tim mạch",
      sampleType: "Máu tĩnh mạch",
      estimatedTime: "60 phút",
    },
    {
      id: 3,
      testNumber: "XN003",
      patient: "Trần Thị E",
      testType: "Nước tiểu",
      priority: "normal",
      status: "completed",
      requestedTime: "2024-01-15 08:45",
      doctor: "BS. Phạm Văn F",
      department: "Tiết niệu",
      sampleType: "Nước tiểu giữa dòng",
      estimatedTime: "20 phút",
    },
    {
      id: 4,
      testNumber: "XN004",
      patient: "Hoàng Văn G",
      testType: "X-Ray ngực",
      priority: "normal",
      status: "pending",
      requestedTime: "2024-01-15 11:00",
      doctor: "BS. Lê Thị H",
      department: "Hô hấp",
      sampleType: "Hình ảnh",
      estimatedTime: "15 phút",
    },
    {
      id: 5,
      testNumber: "XN005",
      patient: "Phạm Thị I",
      testType: "HIV Test",
      priority: "urgent",
      status: "in-progress",
      requestedTime: "2024-01-15 10:45",
      doctor: "BS. Võ Văn J",
      department: "Nhiễm khuẩn",
      sampleType: "Máu tĩnh mạch",
      estimatedTime: "90 phút",
    },
  ];

  const equipmentStatus = [
    {
      name: "Máy xét nghiệm máu tự động Sysmex XN-1000",
      status: "normal",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
      location: "Phòng huyết học",
      testsToday: 45,
    },
    {
      name: "Kính hiển vi Olympus CX23",
      status: "maintenance",
      lastMaintenance: "2024-01-05",
      nextMaintenance: "2024-01-20",
      location: "Phòng tế bào học",
      testsToday: 0,
    },
    {
      name: "Máy ly tâm Eppendorf Centrifuge 5804",
      status: "normal",
      lastMaintenance: "2024-01-12",
      nextMaintenance: "2024-02-12",
      location: "Phòng sinh hóa",
      testsToday: 38,
    },
    {
      name: "Máy X-Ray Canon CXDI-70C",
      status: "warning",
      lastMaintenance: "2023-12-20",
      nextMaintenance: "2024-01-20",
      location: "Phòng chẩn đoán hình ảnh",
      testsToday: 22,
    },
  ];

  const testCategories = [
    { name: "Huyết học", count: 85, percentage: 35 },
    { name: "Sinh hóa", count: 72, percentage: 30 },
    { name: "Vi sinh", count: 48, percentage: 20 },
    { name: "Hình ảnh", count: 25, percentage: 10 },
    { name: "Khác", count: 10, percentage: 5 },
  ];

  const todayStats = {
    totalSamples: 240,
    completed: 168,
    pending: 55,
    inProgress: 17,
    completionRate: 70,
  };

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
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComponentCard title="Xét Nghiệm Gần Đây">
          <div className="space-y-4">
            {recentTests.slice(0, 4).map((test) => (
              <div
                key={test.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {test.testNumber}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        test.priority === "urgent"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {test.priority === "urgent" ? "Khẩn cấp" : "Bình thường"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {test.patient} - {test.testType}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    BS: {test.doctor} ({test.department})
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mẫu: {test.sampleType}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      test.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : test.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {test.status === "pending"
                      ? "Chờ xử lý"
                      : test.status === "in-progress"
                      ? "Đang xử lý"
                      : "Hoàn thành"}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {test.estimatedTime}
                  </p>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Link to="/laboratory/test-management">
                <Button variant="outline" size="sm">
                  Xem Tất Cả Xét Nghiệm
                </Button>
              </Link>
            </div>
          </div>
        </ComponentCard>

        {/* Test Categories */}
        <ComponentCard title="Thống Kê Theo Loại Xét Nghiệm">
          <div className="space-y-4">
            {testCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : index === 2
                        ? "bg-yellow-500"
                        : index === 3
                        ? "bg-purple-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{category.count}</p>
                  <p className="text-xs text-gray-500">{category.percentage}%</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                Tổng cộng:{" "}
                {testCategories.reduce((sum, cat) => sum + cat.count, 0)} xét nghiệm
              </p>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Equipment Status */}
      <div className="mt-6">
        <ComponentCard title="Trạng Thái Thiết Bị">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Thiết Bị</th>
                  <th className="px-4 py-2 text-left">Vị Trí</th>
                  <th className="px-4 py-2 text-left">Trạng Thái</th>
                  <th className="px-4 py-2 text-left">Bảo Trì Lần Cuối</th>
                  <th className="px-4 py-2 text-left">Bảo Trì Tiếp Theo</th>
                  <th className="px-4 py-2 text-left">Xét Nghiệm Hôm Nay</th>
                </tr>
              </thead>
              <tbody>
                {equipmentStatus.map((equipment, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 font-medium">{equipment.name}</td>
                    <td className="px-4 py-2 text-sm">{equipment.location}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          equipment.status === "normal"
                            ? "bg-green-100 text-green-800"
                            : equipment.status === "maintenance"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {equipment.status === "normal"
                          ? "Hoạt động bình thường"
                          : equipment.status === "maintenance"
                          ? "Đang bảo trì"
                          : "Cần kiểm tra"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(equipment.lastMaintenance).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(equipment.nextMaintenance).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className="font-semibold text-blue-600">
                        {equipment.testsToday}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>

      {/* Today's Performance */}
      <div className="mt-6">
        <ComponentCard title="Hiệu Suất Hôm Nay">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {todayStats.totalSamples}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Tổng mẫu
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {todayStats.completed}
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                Hoàn thành
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {todayStats.pending}
              </p>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Chờ xử lý
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {todayStats.inProgress}
              </p>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Đang xử lý
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">
                {todayStats.completionRate}%
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Tỷ lệ hoàn thành
              </p>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <ComponentCard title="Thao Tác Nhanh">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/laboratory/test-management">
              <Button className="w-full">Quản Lý Xét Nghiệm</Button>
            </Link>
            <Link to="/laboratory/test-reports">
              <Button variant="outline" className="w-full">
                Báo Cáo Kết Quả
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Lịch Bảo Trì Thiết Bị
            </Button>
            <Button variant="outline" className="w-full">
              Thống Kê Tổng Hợp
            </Button>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
