import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import { DownloadIcon, EyeIcon, CalenderIcon, UserIcon } from "../../icons";

export default function MedicalRecords() {
  const { user } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data
  const medicalHistory = [
    {
      id: 1,
      date: "2024-01-10",
      doctor: "BS. Nguyễn Văn A",
      diagnosis: "Cảm cúm thông thường",
      treatment: "Nghỉ ngơi, uống nhiều nước",
      prescription: "Paracetamol 500mg",
      notes: "Bệnh nhân khỏe mạnh, không có biến chứng",
    },
    {
      id: 2,
      date: "2023-12-15",
      doctor: "BS. Trần Thị B",
      diagnosis: "Khám sức khỏe định kỳ",
      treatment: "Tư vấn dinh dưỡng",
      prescription: "Vitamin tổng hợp",
      notes: "Chỉ số sức khỏe bình thường",
    },
  ];

  const labResults = [
    {
      id: 1,
      date: "2024-01-08",
      testName: "Công thức máu",
      results: {
        Hemoglobin: {
          value: "14.2 g/dL",
          normal: "12-16 g/dL",
          status: "normal",
        },
        "Bạch cầu": {
          value: "6.8 x10³/µL",
          normal: "4.0-11.0 x10³/µL",
          status: "normal",
        },
        "Tiểu cầu": {
          value: "280 x10³/µL",
          normal: "150-450 x10³/µL",
          status: "normal",
        },
      },
      doctor: "BS. Lê Văn C",
    },
    {
      id: 2,
      date: "2023-12-10",
      testName: "Sinh hóa máu",
      results: {
        Glucose: {
          value: "5.2 mmol/L",
          normal: "3.9-6.1 mmol/L",
          status: "normal",
        },
        Cholesterol: {
          value: "4.8 mmol/L",
          normal: "< 5.2 mmol/L",
          status: "normal",
        },
        Triglycerides: {
          value: "1.5 mmol/L",
          normal: "< 1.7 mmol/L",
          status: "normal",
        },
      },
      doctor: "BS. Phạm Thị D",
    },
  ];

  const allergies = [
    { allergen: "Penicillin", reaction: "Phát ban", severity: "Trung bình" },
    { allergen: "Tôm cua", reaction: "Khó thở", severity: "Nghiêm trọng" },
  ];

  const medications = [
    {
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Mỗi ngày",
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      status: "active",
    },
  ];

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <UserIcon className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Cần Đăng Nhập
        </h2>
        <p className="text-gray-600 mb-6">
          Bạn cần đăng nhập để xem hồ sơ y tế của mình
        </p>
        <div className="space-x-4">
          <Link to="/signin">
            <Button>Đăng Nhập</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Tạo Tài Khoản</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Hồ Sơ Y Tế | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Xem hồ sơ y tế và lịch sử khám bệnh"
      />
      <PageBreadcrumb pageTitle="Hồ Sơ Y Tế" />

      <div className="space-y-6">
        {/* Patient Info */}
        <ComponentCard title="Thông Tin Bệnh Nhân">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ Tên
              </label>
              <p className="text-gray-900">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày Sinh
              </label>
              <p className="text-gray-900">15/06/1990</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới Tính
              </label>
              <p className="text-gray-900">Nam</p>
            </div>
          </div>
        </ComponentCard>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", label: "Tổng Quan" },
              { id: "history", label: "Lịch Sử Khám" },
              { id: "lab-results", label: "Kết Quả XN" },
              { id: "allergies", label: "Dị Ứng" },
              { id: "medications", label: "Thuốc Đang Dùng" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComponentCard title="Lịch Sử Khám Gần Đây">
              <div className="space-y-3">
                {medicalHistory.slice(0, 3).map((record) => (
                  <div
                    key={record.id}
                    className="flex justify-between items-start p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{record.diagnosis}</h4>
                      <p className="text-sm text-gray-600">
                        Bác sĩ: {record.doctor}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard title="Dị Ứng">
              <div className="space-y-3">
                {allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <h4 className="font-medium text-red-800">
                      {allergy.allergen}
                    </h4>
                    <p className="text-sm text-red-600">
                      Phản ứng: {allergy.reaction}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        allergy.severity === "Nghiêm trọng"
                          ? "bg-red-100 text-red-800"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {allergy.severity}
                    </span>
                  </div>
                ))}
              </div>
            </ComponentCard>
          </div>
        )}

        {selectedTab === "history" && (
          <ComponentCard title="Lịch Sử Khám Bệnh">
            <div className="space-y-4">
              {medicalHistory.map((record) => (
                <div key={record.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{record.diagnosis}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Bác sĩ: {record.doctor}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Phương pháp điều trị: {record.treatment}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Đơn thuốc: {record.prescription}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ghi chú: {record.notes}
                  </p>
                </div>
              ))}
            </div>
          </ComponentCard>
        )}

        {selectedTab === "lab-results" && (
          <ComponentCard title="Kết Quả Xét Nghiệm">
            <div className="space-y-4">
              {labResults.map((result) => (
                <div key={result.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{result.testName}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(result.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    {Object.entries(result.results).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-700">{key}</span>
                        <span
                          className={`text-sm font-medium ${
                            value.status === "normal"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {value.value} ({value.normal})
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Bác sĩ: {result.doctor}
                  </p>
                </div>
              ))}
            </div>
          </ComponentCard>
        )}

        {selectedTab === "medications" && (
          <ComponentCard title="Thuốc Đang Dùng">
            <div className="space-y-4">
              {medications.map((medication, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{medication.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Liều lượng: {medication.dosage}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Tần suất: {medication.frequency}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Thời gian bắt đầu:{" "}
                    {new Date(medication.startDate).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Thời gian kết thúc:{" "}
                    {new Date(medication.endDate).toLocaleDateString("vi-VN")}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      medication.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {medication.status}
                  </span>
                </div>
              ))}
            </div>
          </ComponentCard>
        )}
      </div>
    </>
  );
}
