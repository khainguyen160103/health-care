import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      age: 35,
      gender: "Nam",
      lastVisit: "2024-01-15",
      condition: "Cao huyết áp",
    },
    {
      id: 2,
      name: "Trần Thị B",
      age: 28,
      gender: "Nữ",
      lastVisit: "2024-01-10",
      condition: "Đái tháo đường",
    },
  ];

  return (
    <>
      <PageMeta
        title="Lịch Sử Bệnh Nhân | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Xem lịch sử khám bệnh của bệnh nhân"
      />
      <PageBreadcrumb pageTitle="Lịch Sử Bệnh Nhân" />

      <ComponentCard title="Danh Sách Bệnh Nhân">
        <div className="space-y-4">
          {/* Search */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg w-64"
            />
          </div>

          {/* Patient List */}
          <div className="space-y-3">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{patient.name}</h4>
                  <p className="text-sm text-gray-600">
                    {patient.age} tuổi • {patient.gender} • Lần khám cuối:{" "}
                    {new Date(patient.lastVisit).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="text-sm text-blue-600">{patient.condition}</p>
                </div>
                <Button variant="outline" size="sm">
                  Xem Chi Tiết
                </Button>
              </div>
            ))}
          </div>
        </div>
      </ComponentCard>
    </>
  );
}
