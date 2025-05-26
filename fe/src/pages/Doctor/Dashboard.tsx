import {
  useDoctorProfile,
  useDoctorAppointments,
  useDoctorSchedule,
} from "../../hooks";
import { format, isToday } from "date-fns";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
// import { CalenderIcon, UserIcon } from "../../icons";

export default function DoctorDashboard() {
  const { data: profile, isLoading: profileLoading } = useDoctorProfile();
  const { data: todayAppointments, isLoading: appointmentsLoading } =
    useDoctorAppointments({
      date: format(new Date(), "yyyy-MM-dd"),
      status: "confirmed",
    });

  if (profileLoading) return <div>Đang tải...</div>;

  const todayCount =
    todayAppointments?.results?.filter((apt: any) =>
      isToday(new Date(apt.scheduled_time))
    ).length || 0;

  return (
    <>
      <PageMeta
        title="Bảng Điều Khiển Bác Sĩ | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Bảng điều khiển bác sĩ để quản lý bệnh nhân"
      />
      <PageBreadcrumb pageTitle="Bảng Điều Khiển Bác Sĩ" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Stats */}
        <ComponentCard title="Lịch Hẹn Hôm Nay">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">{todayCount}</p>
              <p className="text-sm text-gray-500">Đã Lên Lịch</p>
            </div>
            <CalenderIcon className="h-8 w-8 text-primary" />
          </div>
        </ComponentCard>

        <ComponentCard title="Tổng Số Bệnh Nhân">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-success">156</p>
              <p className="text-sm text-gray-500">Đang Điều Trị</p>
            </div>
            <UserIcon className="h-8 w-8 text-success" />
          </div>
        </ComponentCard>

        <ComponentCard title="Báo Cáo Chờ Duyệt">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-warning">12</p>
              <p className="text-sm text-gray-500">Cần Xem Xét</p>
            </div>
            {/* ClipboardIcon is not available */}
          </div>
        </ComponentCard>

        <ComponentCard title="Kết Quả Xét Nghiệm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-error">5</p>
              <p className="text-sm text-gray-500">Kết Quả Mới</p>
            </div>
            {/* <BellIcon className="h-8 w-8 text-error" /> */}
          </div>
        </ComponentCard>
      </div>

      {/* Today's Schedule */}
      <div className="mt-6">
        <ComponentCard title="Lịch Trình Hôm Nay">
          <div className="space-y-4">
            {appointmentsLoading ? (
              <div>Đang tải lịch trình...</div>
            ) : todayAppointments?.results?.length ? (
              todayAppointments.results
                .filter((apt: any) => isToday(new Date(apt.scheduled_time)))
                .slice(0, 5)
                .map((appointment: any) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {appointment.patient_info?.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {appointment.note || "Khám tổng quát"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(appointment.scheduled_time), "HH:mm")}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {appointment.status === "confirmed"
                          ? "Đã Xác Nhận"
                          : appointment.status === "pending"
                          ? "Chờ Xác Nhận"
                          : appointment.status === "cancelled"
                          ? "Đã Hủy"
                          : appointment.status}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Không có lịch hẹn hôm nay
              </p>
            )}
          </div>
        </ComponentCard>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Thao Tác Nhanh
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link to="/doctor/schedule">
            <Button className="w-full">Xem Lịch Trình</Button>
          </Link>
          <Link to="/doctor/patient-history">
            <Button variant="outline" className="w-full">
              Lịch Sử Bệnh Nhân
            </Button>
          </Link>
          <Link to="/doctor/diagnosis">
            <Button variant="outline" className="w-full">
              Chẩn Đoán
            </Button>
          </Link>
          <Link to="/doctor/lab-orders">
            <Button variant="outline" className="w-full">
              Yêu Cầu Xét Nghiệm
            </Button>
          </Link>
          <Link to="/doctor/medical-reports">
            <Button variant="outline" className="w-full">
              Báo Cáo Y Tế
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
