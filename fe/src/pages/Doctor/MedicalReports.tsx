import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function MedicalReports() {
  const [showAddForm, setShowAddForm] = useState(false);

  const reports = [
    {
      id: 1,
      patient: "Nguyễn Văn A",
      title: "Báo cáo khám tổng quát",
      date: "2024-01-15",
      type: "Khám định kỳ",
      status: "Hoàn thành",
    },
    {
      id: 2,
      patient: "Trần Thị B",
      title: "Báo cáo xét nghiệm máu",
      date: "2024-01-14",
      type: "Xét nghiệm",
      status: "Chờ duyệt",
    },
  ];

  return (
    <>
      <PageMeta
        title="Báo Cáo Y Tế | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý báo cáo y tế của bệnh nhân"
      />
      <PageBreadcrumb pageTitle="Báo Cáo Y Tế" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Danh Sách Báo Cáo Y Tế</h3>
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            {/* <PlusIcon className="h-4 w-4" /> */}
            <span>Tạo Báo Cáo Mới</span>
          </Button>
        </div>

        {/* Add Report Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-4">
                Tạo Báo Cáo Y Tế Mới
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bệnh Nhân
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Chọn bệnh nhân</option>
                    <option value="1">Nguyễn Văn A</option>
                    <option value="2">Trần Thị B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Loại Báo Cáo
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Chọn loại báo cáo</option>
                    <option value="general">Khám tổng quát</option>
                    <option value="lab">Xét nghiệm</option>
                    <option value="imaging">Chẩn đoán hình ảnh</option>
                    <option value="surgery">Phẫu thuật</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Tiêu Đề Báo Cáo
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Nhập tiêu đề báo cáo..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Nội Dung Báo Cáo
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={6}
                    placeholder="Nhập nội dung chi tiết báo cáo..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Kết Luận
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    placeholder="Nhập kết luận..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Khuyến Nghị
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    placeholder="Nhập khuyến nghị..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button className="flex-1">Lưu Báo Cáo</Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddForm(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reports List */}
        <ComponentCard title="Danh Sách Báo Cáo">
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{report.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "Hoàn thành"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Bệnh nhân:</strong> {report.patient}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Loại:</strong> {report.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Ngày tạo:</strong>{" "}
                    {new Date(report.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Xem
                  </Button>
                  <Button variant="outline" size="sm">
                    {/* <DownloadIcon className="h-4 w-4 mr-1" /> */}
                    Tải
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
