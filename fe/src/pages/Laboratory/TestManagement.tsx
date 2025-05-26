import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

interface LabTest {
  id: number;
  testNumber: string;
  patient: string;
  patientId: string;
  doctor: string;
  testType: string;
  priority: string;
  status: string;
  sampleType: string;
  requestedDate: string;
  collectedDate?: string;
  completedDate?: string;
  results?: any;
  notes?: string;
}

export default function TestManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const tests: LabTest[] = [
    {
      id: 1,
      testNumber: "XN001",
      patient: "Nguyễn Văn A",
      patientId: "BN001",
      doctor: "BS. Trần Thị B",
      testType: "Công thức máu",
      priority: "normal",
      status: "pending",
      sampleType: "Máu tĩnh mạch",
      requestedDate: "2024-01-15",
      notes: "Kiểm tra tình trạng thiếu máu",
    },
    {
      id: 2,
      testNumber: "XN002",
      patient: "Lê Văn C",
      patientId: "BN002",
      doctor: "BS. Nguyễn Văn D",
      testType: "Sinh hóa máu",
      priority: "urgent",
      status: "in-progress",
      sampleType: "Máu tĩnh mạch",
      requestedDate: "2024-01-15",
      collectedDate: "2024-01-15",
      notes: "Bệnh nhân có triệu chứng bất thường",
    },
    {
      id: 3,
      testNumber: "XN003",
      patient: "Trần Thị E",
      patientId: "BN003",
      doctor: "BS. Phạm Văn F",
      testType: "Nước tiểu",
      priority: "normal",
      status: "completed",
      sampleType: "Nước tiểu giữa dòng",
      requestedDate: "2024-01-14",
      collectedDate: "2024-01-14",
      completedDate: "2024-01-15",
      results: {
        protein: "Âm tính",
        glucose: "Âm tính",
        bacteria: "Ít",
      },
    },
  ];

  const getStatusDisplayName = (status: string) => {
    const statusNames = {
      pending: "Chờ Lấy Mẫu",
      "sample-collected": "Đã Lấy Mẫu",
      "in-progress": "Đang Thực Hiện",
      completed: "Hoàn Thành",
      reviewed: "Đã Duyệt",
      rejected: "Từ Chối",
    };
    return statusNames[status as keyof typeof statusNames] || status;
  };

  const getPriorityDisplayName = (priority: string) => {
    const priorityNames = {
      normal: "Bình Thường",
      urgent: "Khẩn Cấp",
      stat: "Cấp Tốc",
    };
    return priorityNames[priority as keyof typeof priorityNames] || priority;
  };

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || test.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || test.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      <PageMeta
        title="Quản Lý Xét Nghiệm | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý và theo dõi các xét nghiệm"
      />
      <PageBreadcrumb pageTitle="Quản Lý Xét Nghiệm" />

      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ComponentCard title="Chờ Lấy Mẫu">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">
                  {tests.filter((t) => t.status === "pending").length}
                </p>
                <p className="text-sm text-gray-500">Xét Nghiệm</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Đang Thực Hiện">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {tests.filter((t) => t.status === "in-progress").length}
                </p>
                <p className="text-sm text-gray-500">Xét Nghiệm</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Hoàn Thành">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">
                  {tests.filter((t) => t.status === "completed").length}
                </p>
                <p className="text-sm text-gray-500">Xét Nghiệm</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Khẩn Cấp">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-error">
                  {tests.filter((t) => t.priority === "urgent").length}
                </p>
                <p className="text-sm text-gray-500">Xét Nghiệm</p>
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm xét nghiệm..."
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
              <option value="pending">Chờ Lấy Mẫu</option>
              <option value="sample-collected">Đã Lấy Mẫu</option>
              <option value="in-progress">Đang Thực Hiện</option>
              <option value="completed">Hoàn Thành</option>
              <option value="reviewed">Đã Duyệt</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Tất Cả Mức Độ</option>
              <option value="normal">Bình Thường</option>
              <option value="urgent">Khẩn Cấp</option>
              <option value="stat">Cấp Tốc</option>
            </select>
          </div>
        </div>

        {/* Tests Table */}
        <ComponentCard title="Danh Sách Xét Nghiệm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium">Mã XN</th>
                  <th className="pb-3 font-medium">Bệnh Nhân</th>
                  <th className="pb-3 font-medium">Loại XN</th>
                  <th className="pb-3 font-medium">Bác Sĩ</th>
                  <th className="pb-3 font-medium">Mức Độ</th>
                  <th className="pb-3 font-medium">Trạng Thái</th>
                  <th className="pb-3 font-medium">Ngày YC</th>
                  <th className="pb-3 font-medium">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test) => (
                  <tr key={test.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{test.testNumber}</td>
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{test.patient}</div>
                        <div className="text-sm text-gray-500">
                          {test.patientId}
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{test.testType}</div>
                        <div className="text-sm text-gray-500">
                          {test.sampleType}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-sm">{test.doctor}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          test.priority === "urgent" || test.priority === "stat"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getPriorityDisplayName(test.priority)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          test.status === "completed" ||
                          test.status === "reviewed"
                            ? "bg-green-100 text-green-800"
                            : test.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {getStatusDisplayName(test.status)}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {new Date(test.requestedDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          AA
                        </Button>
                        {(test.status === "pending" ||
                          test.status === "in-progress") && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                        {test.status === "completed" && (
                          <Button size="sm">Duyệt</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentCard>

        {filteredTests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy xét nghiệm nào</p>
          </div>
        )}
      </div>
    </>
  );
}
