import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function DoctorSchedule() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const scheduleItems = [
    {
      id: 1,
      time: "09:00",
      patient: "Nguyễn Văn A",
      type: "Khám tổng quát",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Trần Thị B",
      type: "Tái khám",
      status: "pending",
    },
  ];

  return (
    <>
      <PageMeta
        title="Lịch Trình Bác Sĩ | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Quản lý lịch trình và cuộc hẹn của bác sĩ"
      />
      <PageBreadcrumb pageTitle="Lịch Trình Bác Sĩ" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <ComponentCard title="Chọn Ngày">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </ComponentCard>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-2">
          <ComponentCard
            title={`Lịch Trình Ngày ${new Date(selectedDate).toLocaleDateString(
              "vi-VN"
            )}`}
          >
            <div className="space-y-4">
              {scheduleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold text-blue-600">
                      {item.time}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.patient}</h4>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status === "confirmed"
                        ? "Đã Xác Nhận"
                        : "Chờ Xác Nhận"}
                    </span>
                    <Button size="sm" variant="outline">
                      Chi Tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
