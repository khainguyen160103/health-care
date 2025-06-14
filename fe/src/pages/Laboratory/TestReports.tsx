import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function TestReports() {
  const [showAddReport, setShowAddReport] = useState(false);
  const [reportForm, setReportForm] = useState({
    orderNumber: "",
    testType: "",
    results: "",
    interpretation: "",
    technician: "",
    reviewed: false,
  });

  // Expanded mock test results data for demo purposes
  const testResults = [
    {
      id: 1,
      orderNumber: "XN001",
      patient: "Nguyễn Văn A",
      testType: "Công thức máu",
      results: {
        WBC: {
          value: "8.5",
          unit: "×10³/μL",
          range: "4.0-11.0",
          status: "Bình thường",
        },
        RBC: { value: "4.2", unit: "×10⁶/μL", range: "4.5-5.5", status: "Thấp" },
        Hemoglobin: {
          value: "12.5",
          unit: "g/dL",
          range: "14.0-18.0",
          status: "Thấp",
        },
        Hematocrit: { value: "37.2", unit: "%", range: "42-52", status: "Thấp" },
        Platelets: { value: "280", unit: "×10³/μL", range: "150-400", status: "Bình thường" },
      },
      interpretation: "Thiếu máu nhẹ. Khuyến nghị xét nghiệm sắt.",
      technician: "KTV. Trần Thị B",
      completed: "2024-01-20 14:30",
      status: "Hoàn thành",
      critical: false,
      doctor: "BS. Nguyễn Văn C",
      department: "Nội khoa",
    },
    {
      id: 2,
      orderNumber: "XN002",
      patient: "Lê Văn D",
      testType: "Đường máu",
      results: {
        Glucose: {
          value: "350",
          unit: "mg/dL",
          range: "70-100",
          status: "Cao nghiêm trọng",
        },
        HbA1c: {
          value: "12.5",
          unit: "%",
          range: "4.0-6.0",
          status: "Cao nghiêm trọng",
        },
      },
      interpretation:
        "Đường huyết tăng nghiêm trọng. Cần thông báo bác sĩ ngay lập tức.",
      technician: "KTV. Phạm Văn E",
      completed: "2024-01-20 15:15",
      status: "Hoàn thành",
      critical: true,
      doctor: "BS. Hoàng Thị F",
      department: "Nội tiết",
    },
    {
      id: 3,
      orderNumber: "XN003",
      patient: "Trần Thị G",
      testType: "Nước tiểu",
      results: {
        Protein: {
          value: "Âm tính",
          unit: "",
          range: "Âm tính",
          status: "Bình thường",
        },
        Glucose: {
          value: "Âm tính", 
          unit: "",
          range: "Âm tính",
          status: "Bình thường",
        },
        WBC: {
          value: "2-3",
          unit: "/hpf",
          range: "0-5",
          status: "Bình thường",
        },
        RBC: {
          value: "0-1",
          unit: "/hpf", 
          range: "0-2",
          status: "Bình thường",
        },
      },
      interpretation: "Kết quả xét nghiệm nước tiểu bình thường.",
      technician: "KTV. Lê Văn H",
      completed: "2024-01-20 11:45",
      status: "Hoàn thành",
      critical: false,
      doctor: "BS. Võ Thị I",
      department: "Tiết niệu",
    },
    {
      id: 4,
      orderNumber: "XN004",
      patient: "Phạm Văn J",
      testType: "Sinh hóa máu",
      results: {
        ALT: {
          value: "85",
          unit: "U/L",
          range: "7-40",
          status: "Cao",
        },
        AST: {
          value: "78",
          unit: "U/L", 
          range: "10-40",
          status: "Cao",
        },
        Bilirubin: {
          value: "2.8",
          unit: "mg/dL",
          range: "0.2-1.2",
          status: "Cao",
        },
        Creatinine: {
          value: "1.0",
          unit: "mg/dL",
          range: "0.6-1.2",
          status: "Bình thường",
        },
      },
      interpretation: "Men gan tăng nhẹ. Khuyến nghị theo dõi và tái khám.",
      technician: "KTV. Ngô Thị K",
      completed: "2024-01-20 16:20",
      status: "Hoàn thành",
      critical: false,
      doctor: "BS. Đinh Văn L",
      department: "Tiêu hóa",
    },
    {
      id: 5,
      orderNumber: "XN005",
      patient: "Hoàng Thị M",
      testType: "X-Ray ngực",
      results: {
        Description: {
          value: "Phổi hai bên trong giới hạn bình thường. Tim có kích thước bình thường.",
          unit: "",
          range: "",
          status: "Bình thường",
        },
      },
      interpretation: "X-quang ngực bình thường. Không phát hiện bất thường.",
      technician: "KTV. Bùi Văn N",
      completed: "2024-01-20 13:10",
      status: "Hoàn thành", 
      critical: false,
      doctor: "BS. Trương Thị O",
      department: "Hô hấp",
    },
    {
      id: 6,
      orderNumber: "XN006",
      patient: "Lý Văn P",
      testType: "HIV/AIDS",
      results: {
        "HIV Antibody": {
          value: "Âm tính",
          unit: "",
          range: "Âm tính",
          status: "Bình thường",
        },
        "HIV Antigen": {
          value: "Âm tính",
          unit: "",
          range: "Âm tính", 
          status: "Bình thường",
        },
      },
      interpretation: "Kết quả âm tính với HIV. Không phát hiện nhiễm virus.",
      technician: "KTV. Cao Thị Q",
      completed: "2024-01-20 17:30",
      status: "Hoàn thành",
      critical: false,
      doctor: "BS. Đặng Văn R",
      department: "Nhiễm khuẩn",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding report:", reportForm);
    setShowAddReport(false);
    setReportForm({
      orderNumber: "",
      testType: "",
      results: "",
      interpretation: "",
      technician: "",
      reviewed: false,
    });
  };

  const handleSendReport = (reportId: number) => {
    console.log("Sending report:", reportId);
  };

  return (
    <>
      <PageMeta
        title="Test Reports | Health Care System"
        description="Upload and manage test reports"
      />
      <PageBreadcrumb pageTitle="Test Reports" />

      <div className="mb-6">
        <Button
          variant="primary"
          // startIcon={<PlusIcon />}
          onClick={() => setShowAddReport(true)}
        >
          Thêm báo cáo xét nghiệm
        </Button>
      </div>

      {/* Add Report Form */}
      {showAddReport && (
        <ComponentCard title="Thêm báo cáo xét nghiệm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Số hiệu yêu cầu
                </label>
                <select
                  value={reportForm.orderNumber}
                  onChange={(e) =>
                    setReportForm({
                      ...reportForm,
                      orderNumber: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                >
                  <option value="">Chọn đơn xét nghiệm</option>
                  <option value="LAB003">LAB003 - Mike Johnson</option>
                  <option value="LAB004">LAB004 - Sarah Wilson</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Loại xét nghiệm
                </label>
                <input
                  type="text"
                  value={reportForm.testType}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, testType: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="vd: Công thức máu hoàn chỉnh"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Kết quả xét nghiệm
              </label>
              <textarea
                value={reportForm.results}
                onChange={(e) =>
                  setReportForm({ ...reportForm, results: e.target.value })
                }
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Nhập kết quả xét nghiệm chi tiết..."
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Diễn giải lâm sàng
              </label>
              <textarea
                value={reportForm.interpretation}
                onChange={(e) =>
                  setReportForm({
                    ...reportForm,
                    interpretation: e.target.value,
                  })
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Diễn giải và khuyến nghị lâm sàng..."
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Kỹ thuật viên
              </label>
              <input
                type="text"
                value={reportForm.technician}
                onChange={(e) =>
                  setReportForm({ ...reportForm, technician: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Tên kỹ thuật viên"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reviewed"
                checked={reportForm.reviewed}
                onChange={(e) =>
                  setReportForm({ ...reportForm, reviewed: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="reviewed" className="text-sm font-medium">
                Báo cáo đã được xem xét và phê duyệt
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowAddReport(false)}>
                Hủy
              </Button>
              <Button variant="primary">Lưu báo cáo</Button>
            </div>
          </form>
        </ComponentCard>
      )}

      {/* Test Results */}
      <div className="space-y-6">
        {testResults.map((result) => (
          <ComponentCard
            key={result.id}
            title={`${result.testType} - ${result.patient}`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Số yêu cầu: {result.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày hoàn thành: {result.completed}
                  </p>
                  <p className="text-sm text-gray-500">
                    Kỹ thuật viên: {result.technician}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {result.critical && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                      Nguy hiểm
                    </span>
                  )}
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    {result.status}
                  </span>
                </div>
              </div>

              {/* Test Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-3 py-2 text-left">Xét nghiệm</th>
                      <th className="px-3 py-2 text-left">Kết quả</th>
                      <th className="px-3 py-2 text-left">Đơn vị</th>
                      <th className="px-3 py-2 text-left">Giá trị tham khảo</th>
                      <th className="px-3 py-2 text-left">Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.results).map(([testName, data]) => (
                      <tr key={testName} className="border-b">
                        <td className="px-3 py-2 font-medium">{testName}</td>
                        <td className="px-3 py-2">{data.value}</td>
                        <td className="px-3 py-2">{data.unit}</td>
                        <td className="px-3 py-2">{data.range}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              data.status === "Normal"
                                ? "bg-green-100 text-green-800"
                                : data.status.includes("Critical")
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {data.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interpretation */}
              <div>
                <h4 className="font-medium mb-2">Diễn giải lâm sàng:</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {result.interpretation}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline">
                  Chỉnh sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  // startIcon={<DownloadIcon />}
                >
                  Tải về
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleSendReport(result.id)}
                >
                  Gửi bác sĩ
                </Button>
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>
    </>
  );
}
