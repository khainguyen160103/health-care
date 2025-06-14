import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

// SVG Icons components
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CalenderIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function MedicalRecords() {
  const { user } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState("overview");

  // Expanded mock medical data for demo purposes
  const medicalHistory = [
    {
      id: 1,
      date: "2024-01-10",
      doctor: "BS. Nguyễn Văn A",
      department: "Nội khoa",
      diagnosis: "Cảm cúm thông thường",
      treatment: "Nghỉ ngơi, uống nhiều nước, thuốc hạ sốt",
      prescription: "Paracetamol 500mg x 3 lần/ngày",
      notes: "Bệnh nhân khỏe mạnh, không có biến chứng. Tái khám nếu có triệu chứng nặng hơn.",
      visitType: "Khám bệnh",
      followUp: "2024-01-17",
    },
    {
      id: 2,
      date: "2023-12-15",
      doctor: "BS. Trần Thị B",
      department: "Y học dự phòng",
      diagnosis: "Khám sức khỏe định kỳ",
      treatment: "Tư vấn dinh dưỡng và lối sống",
      prescription: "Vitamin tổng hợp x 1 lần/ngày",
      notes: "Chỉ số sức khỏe bình thường. Khuyến nghị tập thể dục đều đặn.",
      visitType: "Khám định kỳ",
      followUp: "2024-06-15",
    },
    {
      id: 3,
      date: "2023-11-20",
      doctor: "BS. Lê Văn C",
      department: "Tim mạch",
      diagnosis: "Kiểm tra huyết áp",
      treatment: "Theo dõi huyết áp hàng ngày",
      prescription: "Không cần thuốc",
      notes: "Huyết áp ở mức bình thường. Duy trì chế độ ăn ít muối.",
      visitType: "Tái khám",
      followUp: "2024-02-20",
    },
    {
      id: 4,
      date: "2023-10-05",
      doctor: "BS. Phạm Thị D",
      department: "Tiêu hóa",
      diagnosis: "Đau dạ dày do stress",
      treatment: "Thuốc kháng acid, giảm stress",
      prescription: "Omeprazole 20mg x 1 lần/ngày trước ăn",
      notes: "Triệu chứng cải thiện sau 1 tuần điều trị. Tránh thực phẩm cay nóng.",
      visitType: "Khám bệnh",
      followUp: "2023-10-19",
    },
  ];

  const labResults = [
    {
      id: 1,
      date: "2024-01-08",
      testName: "Công thức máu",
      orderNumber: "XN001",
      results: {
        "Hồng cầu": {
          value: "4.5 x10⁶/µL",
          normal: "4.0-5.5 x10⁶/µL",
          status: "normal",
        },
        Hemoglobin: {
          value: "14.2 g/dL",
          normal: "12-16 g/dL",
          status: "normal",
        },
        Hematocrit: {
          value: "42.1 %",
          normal: "36-48 %",
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
      interpretation: "Các chỉ số máu trong giới hạn bình thường.",
    },
    {
      id: 2,
      date: "2023-12-10",
      testName: "Sinh hóa máu",
      orderNumber: "XN002",
      results: {
        "Glucose lúc đói": {
          value: "5.2 mmol/L",
          normal: "3.9-6.1 mmol/L",
          status: "normal",
        },
        "Cholesterol toàn phần": {
          value: "4.8 mmol/L",
          normal: "< 5.2 mmol/L",
          status: "normal",
        },
        "HDL-C": {
          value: "1.4 mmol/L",
          normal: "> 1.0 mmol/L",
          status: "normal",
        },
        "LDL-C": {
          value: "2.8 mmol/L",
          normal: "< 3.4 mmol/L",
          status: "normal",
        },
        Triglycerides: {
          value: "1.5 mmol/L",
          normal: "< 1.7 mmol/L",
          status: "normal",
        },
      },
      doctor: "BS. Phạm Thị D",
      interpretation: "Chức năng gan và lipid máu bình thường.",
    },
    {
      id: 3,
      date: "2023-11-25",
      testName: "Nước tiểu",
      orderNumber: "XN003",
      results: {
        Protein: {
          value: "Âm tính",
          normal: "Âm tính",
          status: "normal",
        },
        Glucose: {
          value: "Âm tính",
          normal: "Âm tính",
          status: "normal",
        },
        "Bạch cầu": {
          value: "1-2/hpf",
          normal: "0-5/hpf",
          status: "normal",
        },
        "Hồng cầu": {
          value: "0-1/hpf",
          normal: "0-2/hpf",
          status: "normal",
        },
      },
      doctor: "BS. Hoàng Văn E",
      interpretation: "Nước tiểu bình thường, không phát hiện bất thường.",
    },
  ];

  const allergies = [
    { 
      allergen: "Penicillin", 
      reaction: "Phát ban, ngứa", 
      severity: "Trung bình",
      diagnosedDate: "2020-03-15",
      notes: "Tránh tất cả thuốc kháng sinh nhóm Beta-lactam"
    },
    { 
      allergen: "Tôm cua", 
      reaction: "Khó thở, sưng môi", 
      severity: "Nghiêm trọng",
      diagnosedDate: "2018-07-20",
      notes: "Mang theo thuốc chống dị ứng khi cần thiết"
    },
    { 
      allergen: "Phấn hoa", 
      reaction: "Hắt hơi, chảy nước mũi", 
      severity: "Nhẹ",
      diagnosedDate: "2019-04-10",
      notes: "Triệu chứng thường xuất hiện vào mùa xuân"
    },
  ];

  const medications = [
    {
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Mỗi ngày",
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      status: "active",
      doctor: "BS. Trần Thị B",
      purpose: "Bổ sung vitamin D",
    },
    {
      name: "Calcium Carbonate",
      dosage: "500mg",
      frequency: "2 lần/ngày",
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      status: "active",
      doctor: "BS. Trần Thị B",
      purpose: "Tăng cường xương khớp",
    },
    {
      name: "Omeprazole",
      dosage: "20mg",
      frequency: "1 lần/ngày trước ăn",
      startDate: "2023-10-05",
      endDate: "2023-11-05",
      status: "completed",
      doctor: "BS. Phạm Thị D",
      purpose: "Điều trị đau dạ dày",
    },
  ];

  const vitalSigns = [
    {
      date: "2024-01-10",
      bloodPressure: "120/80",
      heartRate: "72",
      temperature: "36.5",
      weight: "68",
      height: "170",
      bmi: "23.5",
    },
    {
      date: "2023-12-15", 
      bloodPressure: "118/75",
      heartRate: "70",
      temperature: "36.3",
      weight: "67.5",
      height: "170",
      bmi: "23.4",
    },
    {
      date: "2023-11-20",
      bloodPressure: "125/82",
      heartRate: "75",
      temperature: "36.4",
      weight: "68.2",
      height: "170",
      bmi: "23.6",
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
                    Phòng khám: {record.department}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Phương pháp điều trị: {record.treatment}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Đơn thuốc: {record.prescription}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Loại hình khám: {record.visitType}
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
                  <p className="text-sm text-gray-600">
                    Giải thích: {result.interpretation}
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
                  <p className="text-sm text-gray-600 mb-1">
                    Mục đích: {medication.purpose}
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
