import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

interface OrderForm {
  patientId: string;
  tests: string[];
  priority: string;
  notes: string;
}

export default function LabOrders() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    patientId: "",
    tests: [],
    priority: "normal",
    notes: "",
  });

  const labOrders = [
    {
      id: 1,
      orderNumber: "XN001",
      patient: "Nguyễn Văn A",
      tests: ["Công thức máu", "Đường huyết"],
      date: "2024-01-15",
      status: "Chờ xử lý",
      priority: "Cao",
    },
    {
      id: 2,
      orderNumber: "XN002",
      patient: "Trần Thị B",
      tests: ["Nước tiểu", "Chức năng gan"],
      date: "2024-01-14",
      status: "Hoàn thành",
      priority: "Bình thường",
    },
  ];

  const availableTests = [
    "Công thức máu",
    "Đường huyết",
    "Nước tiểu",
    "Chức năng gan",
    "Chức năng thận",
    "Lipid máu",
    "X-quang ngực",
    "Siêu âm bụng",
  ];

  return (
    <>
      <PageMeta
        title="Yêu Cầu Xét Nghiệm | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý yêu cầu xét nghiệm cho bệnh nhân"
      />
      <PageBreadcrumb pageTitle="Yêu Cầu Xét Nghiệm" />

      <div className="space-y-6">
        {/* Add Order Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Danh Sách Yêu Cầu Xét Nghiệm</h3>
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            {/* <PlusIcon className="h-4 w-4" /> */}
            <span>Tạo Yêu Cầu Mới</span>
          </Button>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Tạo Yêu Cầu Xét Nghiệm
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bệnh Nhân</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Chọn bệnh nhân</option>
                    <option value="1">Nguyễn Văn A</option>
                    <option value="2">Trần Thị B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Xét Nghiệm
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availableTests.map((test) => (
                      <label key={test} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{test}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mức Độ Ưu Tiên
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="normal">Bình thường</option>
                    <option value="urgent">Khẩn cấp</option>
                    <option value="stat">Cấp tốc</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ghi Chú</label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    placeholder="Ghi chú thêm..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button className="flex-1">Tạo Yêu Cầu</Button>
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

        {/* Orders List */}
        <ComponentCard title="Danh Sách Yêu Cầu">
          <div className="space-y-4">
            {labOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{order.orderNumber}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Hoàn thành"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.priority === "Cao"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Bệnh nhân:</strong> {order.patient}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Xét nghiệm:</strong> {order.tests.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Ngày tạo:</strong>{" "}
                    {new Date(order.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {/* <EyeIcon className="h-4 w-4 mr-1" /> */}
                  Chi Tiết
                </Button>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
