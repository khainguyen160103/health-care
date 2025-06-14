import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

// SVG Plus Icon component
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

interface Medication {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  price: number;
  expiryDate: string;
  supplier: string;
  status: string;
}

export default function StockManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  // Expanded mock medication data for demo purposes
  const medications: Medication[] = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Giảm đau",
      currentStock: 50,
      minStock: 100,
      maxStock: 500,
      unit: "Viên",
      price: 500,
      expiryDate: "2025-12-31",
      supplier: "Công ty Dược A",
      status: "low",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Kháng sinh",
      currentStock: 25,
      minStock: 80,
      maxStock: 300,
      unit: "Viên",
      price: 1200,
      expiryDate: "2025-06-30",
      supplier: "Công ty Dược B",
      status: "critical",
    },
    {
      id: 3,
      name: "Vitamin C 1000mg",
      category: "Vitamin",
      currentStock: 200,
      minStock: 50,
      maxStock: 400,
      unit: "Viên",
      price: 800,
      expiryDate: "2026-03-15",
      supplier: "Công ty Dược C",
      status: "normal",
    },
    {
      id: 4,
      name: "Insulin Glargine 100IU/ml",
      category: "Tiểu đường",
      currentStock: 8,
      minStock: 20,
      maxStock: 60,
      unit: "Chai",
      price: 150000,
      expiryDate: "2024-11-30",
      supplier: "Công ty Dược D",
      status: "critical",
    },
    {
      id: 5,
      name: "Omeprazole 20mg",
      category: "Tiêu hóa",
      currentStock: 35,
      minStock: 60,
      maxStock: 200,
      unit: "Viên",
      price: 1200,
      expiryDate: "2025-08-20",
      supplier: "Công ty Dược A",
      status: "low",
    },
    {
      id: 6,
      name: "Metformin 500mg",
      category: "Tiểu đường",
      currentStock: 150,
      minStock: 100,
      maxStock: 300,
      unit: "Viên",
      price: 700,
      expiryDate: "2025-10-15",
      supplier: "Công ty Dược E",
      status: "normal",
    },
    {
      id: 7,
      name: "Lisinopril 10mg",
      category: "Tim mạch",
      currentStock: 75,
      minStock: 50,
      maxStock: 150,
      unit: "Viên",
      price: 1500,
      expiryDate: "2025-07-22",
      supplier: "Công ty Dược F",
      status: "normal",
    },
    {
      id: 8,
      name: "Atorvastatin 20mg",
      category: "Tim mạch",
      currentStock: 40,
      minStock: 60,
      maxStock: 180,
      unit: "Viên",
      price: 2000,
      expiryDate: "2025-09-10",
      supplier: "Công ty Dược G",
      status: "low",
    },
    {
      id: 9,
      name: "Aspirin 100mg",
      category: "Tim mạch",
      currentStock: 300,
      minStock: 100,
      maxStock: 500,
      unit: "Viên",
      price: 300,
      expiryDate: "2026-01-30",
      supplier: "Công ty Dược H",
      status: "normal",
    },
    {
      id: 10,
      name: "Cephalexin 500mg",
      category: "Kháng sinh",
      currentStock: 15,
      minStock: 50,
      maxStock: 200,
      unit: "Viên",
      price: 1800,
      expiryDate: "2025-05-18",
      supplier: "Công ty Dược I",
      status: "critical",
    },
    {
      id: 11,
      name: "Loratadine 10mg",
      category: "Chống dị ứng",
      currentStock: 120,
      minStock: 80,
      maxStock: 250,
      unit: "Viên",
      price: 600,
      expiryDate: "2025-11-25",
      supplier: "Công ty Dược J",
      status: "normal",
    },
    {
      id: 12,
      name: "Ibuprofen 400mg",
      category: "Giảm đau",
      currentStock: 45,
      minStock: 80,
      maxStock: 300,
      unit: "Viên",
      price: 900,
      expiryDate: "2025-04-12",
      supplier: "Công ty Dược A",
      status: "low",
    },
  ];

  const getStatusDisplayName = (status: string) => {
    const statusNames = {
      normal: "Bình Thường",
      low: "Sắp Hết",
      critical: "Rất Thấp",
      expired: "Hết Hạn",
    };
    return statusNames[status as keyof typeof statusNames] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      normal: "bg-green-100 text-green-800",
      low: "bg-yellow-100 text-yellow-800",
      critical: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredMedications = medications.filter((med) => {
    const matchesSearch = med.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stockStats = {
    total: medications.length,
    normal: medications.filter((m) => m.status === "normal").length,
    low: medications.filter((m) => m.status === "low").length,
    critical: medications.filter((m) => m.status === "critical").length,
  };

  return (
    <>
      <PageMeta
        title="Quản Lý Kho Thuốc | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý tồn kho và thuốc"
      />
      <PageBreadcrumb pageTitle="Quản Lý Kho Thuốc" />

      <div className="space-y-6">
        {/* Stock Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ComponentCard title="Tổng Loại Thuốc">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {stockStats.total}
                </p>
                <p className="text-sm text-gray-500">Loại Thuốc</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Tồn Kho Tốt">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">
                  {stockStats.normal}
                </p>
                <p className="text-sm text-gray-500">Loại Thuốc</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Sắp Hết">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">
                  {stockStats.low}
                </p>
                <p className="text-sm text-gray-500">Loại Thuốc</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Rất Thấp">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-error">
                  {stockStats.critical}
                </p>
                <p className="text-sm text-gray-500">Loại Thuốc</p>
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Tất Cả Danh Mục</option>
              <option value="Giảm đau">Giảm Đau</option>
              <option value="Kháng sinh">Kháng Sinh</option>
              <option value="Vitamin">Vitamin</option>
              <option value="Tim mạch">Tim Mạch</option>
              <option value="Tiêu hóa">Tiêu Hóa</option>
            </select>
          </div>

          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Thêm Thuốc Mới</span>
          </Button>
        </div>

        {/* Add Medication Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-4">Thêm Thuốc Mới</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tên Thuốc
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Nhập tên thuốc..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Danh Mục
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Chọn danh mục</option>
                    <option value="Giảm đau">Giảm Đau</option>
                    <option value="Kháng sinh">Kháng Sinh</option>
                    <option value="Vitamin">Vitamin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Số Lượng Ban Đầu
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Đơn Vị
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="Viên">Viên</option>
                    <option value="Chai">Chai</option>
                    <option value="Hộp">Hộp</option>
                    <option value="Ống">Ống</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Giá (VNĐ)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hạn Sử Dụng
                  </label>
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tồn Kho Tối Thiểu
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nhà Cung Cấp
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Nhập tên nhà cung cấp..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button className="flex-1">Thêm Thuốc</Button>
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

        {/* Medications Table */}
        <ComponentCard
          title={`Danh Sách Thuốc (${filteredMedications.length})`}
        >
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium">Tên Thuốc</th>
                  <th className="pb-3 font-medium">Danh Mục</th>
                  <th className="pb-3 font-medium">Tồn Kho</th>
                  <th className="pb-3 font-medium">Đơn Giá</th>
                  <th className="pb-3 font-medium">Hạn SD</th>
                  <th className="pb-3 font-medium">Trạng Thái</th>
                  <th className="pb-3 font-medium">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedications.map((medication) => (
                  <tr key={medication.id} className="border-b border-gray-100">
                    <td className="py-3">
                      <div className="font-medium text-gray-900">
                        {medication.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {medication.supplier}
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">
                      {medication.category}
                    </td>
                    <td className="py-3">
                      <div className="font-medium">
                        {medication.currentStock} {medication.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        Min: {medication.minStock}
                      </div>
                    </td>
                    <td className="py-3 font-medium text-blue-600">
                      {medication.price.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="py-3 text-gray-600">
                      {new Date(medication.expiryDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          medication.status
                        )}`}
                      >
                        {getStatusDisplayName(medication.status)}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Nhập Kho</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
