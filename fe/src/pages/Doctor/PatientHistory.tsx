import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  // Expanded mock patient data for demo purposes
  const patients = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      age: 35,
      gender: "Nam",
      lastVisit: "2024-01-15",
      condition: "Cao huyết áp",
      phone: "0901234567",
      email: "nguyenvana@email.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      medicalHistory: [
        {
          date: "2024-01-15",
          diagnosis: "Cao huyết áp độ 1",
          treatment: "Thuốc hạ huyết áp, chế độ ăn ít muối",
          notes: "Huyết áp 140/90 mmHg, cần theo dõi"
        },
        {
          date: "2023-12-20",
          diagnosis: "Khám tổng quát",
          treatment: "Tư vấn dinh dưỡng",
          notes: "Sức khỏe tổng thể tốt"
        }
      ],
      bloodType: "A+",
      allergies: "Không có",
      insurance: "BHYT123456"
    },
    {
      id: 2,
      name: "Trần Thị B",
      age: 28,
      gender: "Nữ",
      lastVisit: "2024-01-10",
      condition: "Đái tháo đường type 2",
      phone: "0907654321",
      email: "tranthib@email.com",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      medicalHistory: [
        {
          date: "2024-01-10",
          diagnosis: "Đái tháo đường type 2",
          treatment: "Metformin 500mg x2/ngày, chế độ ăn kiêng",
          notes: "Đường máu đói: 180 mg/dL, HbA1c: 8.5%"
        },
        {
          date: "2023-11-15",
          diagnosis: "Đái tháo đường mới phát hiện",
          treatment: "Tư vấn chế độ ăn, theo dõi đường máu",
          notes: "Bắt đầu điều trị"
        }
      ],
      bloodType: "O+",
      allergies: "Dị ứng Penicillin",
      insurance: "BHYT789012"
    },
    {
      id: 3,
      name: "Lê Văn C",
      age: 42,
      gender: "Nam",
      lastVisit: "2024-01-08",
      condition: "Viêm gan B mạn tính",
      phone: "0912345678",
      email: "levanc@email.com",
      address: "789 Đường DEF, Quận 5, TP.HCM",
      medicalHistory: [
        {
          date: "2024-01-08",
          diagnosis: "Viêm gan B mạn tính",
          treatment: "Thuốc kháng virus, theo dõi định kỳ",
          notes: "HBV DNA không phát hiện, ALT bình thường"
        }
      ],
      bloodType: "B+",
      allergies: "Không có",
      insurance: "BHYT345678"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      age: 55,
      gender: "Nữ",
      lastVisit: "2024-01-12",
      condition: "Loãng xương",
      phone: "0923456789",
      email: "phamthid@email.com",
      address: "321 Đường GHI, Quận 7, TP.HCM",
      medicalHistory: [
        {
          date: "2024-01-12",
          diagnosis: "Loãng xương cột sống",
          treatment: "Calcium + Vitamin D3, tập thể dục nhẹ",
          notes: "T-score: -2.8, nguy cơ gãy xương cao"
        }
      ],
      bloodType: "AB+",
      allergies: "Dị ứng tôm cua",
      insurance: "BHYT901234"
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      age: 38,
      gender: "Nam",
      lastVisit: "2024-01-14",
      condition: "Bệnh tim mạch vành",
      phone: "0934567890",
      email: "hoangvane@email.com",
      address: "654 Đường JKL, Quận 2, TP.HCM",
      medicalHistory: [
        {
          date: "2024-01-14",
          diagnosis: "Bệnh tim mạch vành, hẹp động mạch 60%",
          treatment: "Thuốc chống đông máu, Statin",
          notes: "Cần theo dõi sát, có thể cần can thiệp"
        }
      ],
      bloodType: "A-",
      allergies: "Không có",
      insurance: "BHYT567890"
    }
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
          </div>          {/* Patient List */}
          <div className="space-y-3">
            {patients
              .filter(patient => 
                patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.phone.includes(searchTerm)
              )
              .map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {patient.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {patient.age} tuổi • {patient.gender}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">SĐT:</span> {patient.phone}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Email:</span> {patient.email}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Nhóm máu:</span> {patient.bloodType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Lần khám cuối:</span> {new Date(patient.lastVisit).toLocaleDateString("vi-VN")}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">BHYT:</span> {patient.insurance}
                          </p>
                          {patient.allergies !== "Không có" && (
                            <p className="text-sm text-red-600">
                              <span className="font-medium">Dị ứng:</span> {patient.allergies}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {patient.condition}
                        </span>
                        {patient.allergies !== "Không có" && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Có dị ứng
                          </span>
                        )}
                      </div>

                      {/* Latest Medical Record */}
                      {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                            Lần khám gần nhất:
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Chẩn đoán:</span> {patient.medicalHistory[0].diagnosis}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Điều trị:</span> {patient.medicalHistory[0].treatment}
                          </p>
                          {patient.medicalHistory[0].notes && (
                            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                              {patient.medicalHistory[0].notes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        Xem Chi Tiết
                      </Button>
                      <Button size="sm">
                        Lịch Sử Khám
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ComponentCard>
    </>
  );
}
