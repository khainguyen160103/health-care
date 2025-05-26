import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function Diagnosis() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [diagnosisForm, setDiagnosisForm] = useState({
    patientId: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  const recentDiagnoses = [
    {
      id: 1,
      patient: "Nguyễn Văn A",
      date: "2024-01-15",
      diagnosis: "Cao huyết áp",
      treatment: "Thuốc hạ huyết áp",
    },
    {
      id: 2,
      patient: "Trần Thị B",
      date: "2024-01-14",
      diagnosis: "Đái tháo đường type 2",
      treatment: "Metformin, chế độ ăn",
    },
  ];

  return (
    <>
      <PageMeta
        title="Chẩn Đoán | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý chẩn đoán và điều trị bệnh nhân"
      />
      <PageBreadcrumb pageTitle="Chẩn Đoán" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Diagnosis Form */}
        <ComponentCard title="Thêm Chẩn Đoán Mới">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bệnh Nhân</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={diagnosisForm.patientId}
                onChange={(e) =>
                  setDiagnosisForm({
                    ...diagnosisForm,
                    patientId: e.target.value,
                  })
                }
              >
                <option value="">Chọn bệnh nhân</option>
                <option value="1">Nguyễn Văn A</option>
                <option value="2">Trần Thị B</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Triệu Chứng</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Mô tả triệu chứng..."
                value={diagnosisForm.symptoms}
                onChange={(e) =>
                  setDiagnosisForm({ ...diagnosisForm, symptoms: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Chẩn Đoán</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Nhập chẩn đoán..."
                value={diagnosisForm.diagnosis}
                onChange={(e) =>
                  setDiagnosisForm({ ...diagnosisForm, diagnosis: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phương Pháp Điều Trị</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Mô tả phương pháp điều trị..."
                value={diagnosisForm.treatment}
                onChange={(e) =>
                  setDiagnosisForm({ ...diagnosisForm, treatment: e.target.value })
                }
              />
            </div>

            <Button className="w-full">Lưu Chẩn Đoán</Button>
          </div>
        </ComponentCard>

        {/* Recent Diagnoses */}
        <ComponentCard title="Chẩn Đoán Gần Đây">
          <div className="space-y-4">
            {recentDiagnoses.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.patient}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mb-1">
                  <strong>Chẩn đoán:</strong> {item.diagnosis}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Điều trị:</strong> {item.treatment}
                </p>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
