import {
  usePatientProfile,
  usePatientAppointments,
  useMyBills,
} from "../../hooks";
import { format } from "date-fns";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { CalenderIcon, DollarLineIcon, UserIcon } from "../../icons";

export default function PatientDashboard() {
  const { user } = useAuthContext();
  console.log(user);
  // Chỉ fetch data nếu user đã đăng nhập
  const { data: profile, isLoading: profileLoading } = usePatientProfile();
  const { data: appointments, isLoading: appointmentsLoading } =
    usePatientAppointments({});
  const { data: bills, isLoading: billsLoading } = useMyBills(
    user ? user.id : ""
  );

  return (
    <>
      <PageMeta
        title="Bảng Điều Khiển Bệnh Nhân | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Cổng thông tin bệnh nhân để quản lý chăm sóc sức khỏe"
      />
      <PageBreadcrumb pageTitle="Bảng Điều Khiển Bệnh Nhân" />
      {/* Guest Welcome Message */}
      {!user && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900 dark:border-blue-700">
          <h3 className="text-lg text-blue-800 dark:text-blue-200 mb-2">
            Chào Mừng Đến Với Hệ Thống Chăm Sóc Sức Khỏe
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-3">
            Bạn đang trong chế độ khách. Đăng nhập để truy cập hồ sơ sức khỏe cá
            nhân, lịch hẹn và nhiều tính năng khác.
          </p>
          <div className="flex space-x-3">
            <Link to="/signin">
              <Button variant="primary" size="sm">
                Đăng Nhập
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm">
                Tạo Tài Khoản
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Stats */}
        <ComponentCard title="Lịch Hẹn Sắp Tới">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {user
                  ? appointmentsLoading
                    ? "..."
                    : appointments?.results?.length || 0
                  : "0"}
              </p>
              <p className="text-sm text-gray-500">Đã Lên Lịch</p>
            </div>
            <CalenderIcon className="h-8 w-8 text-primary" />
          </div>
        </ComponentCard>

        <ComponentCard title="Hồ Sơ Y Tế">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-success">
                {user ? (profileLoading ? "..." : "Có Sẵn") : "Cần Đăng Nhập"}
              </p>
              <p className="text-sm text-gray-500">Hồ Sơ</p>
            </div>
            {/* <ClipboardIcon className="h-8 w-8 text-success" /> */}
          </div>
        </ComponentCard>

        <ComponentCard title="Đơn Thuốc">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-warning">
                {user ? "Đang Hoạt Động" : "Không Có"}
              </p>
              <p className="text-sm text-gray-500">Hiện Tại</p>
            </div>
            <UserIcon className="h-8 w-8 text-warning" />
          </div>
        </ComponentCard>

        <ComponentCard title="Hóa Đơn Chưa Thanh Toán">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-error">
                {user
                  ? billsLoading
                    ? "..."
                    : `${
                        Array.isArray(bills)
                          ? bills
                              .reduce(
                                (sum, bill) => sum + (bill.amount || 0),
                                0
                              )
                              .toLocaleString("vi-VN")
                          : 0
                      }đ`
                  : "0đ"}
              </p>
              <p className="text-sm text-gray-500">Số Tiền</p>
            </div>
            <DollarLineIcon className="h-8 w-8 text-error" />
          </div>
        </ComponentCard>
      </div>
      <h1>asdasd</h1>
      {/* Recent Appointments */}
      {user && (
        <div className="mt-6">
          <ComponentCard title="Lịch Hẹn Gần Đây">
            <div className="space-y-4">
              {appointmentsLoading ? (
                <div>Đang tải lịch hẹn...</div>
              ) : appointments?.results?.length ? (
                appointments.results.slice(0, 3).map((appointment: any) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Bác sĩ {appointment.doctor_info?.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {appointment.note || "Khám tổng quát"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(
                          new Date(appointment.scheduled_time),
                          "dd/MM/yyyy"
                        )}
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
                  Không tìm thấy lịch hẹn nào
                </p>
              )}
            </div>
          </ComponentCard>
        </div>
      )}
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl text-gray-900 dark:text-white mb-4">
          Thao Tác Nhanh
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link to="/patient/book-appointment">
            <Button className="w-full">Đặt Lịch Hẹn</Button>
          </Link>
          <Link to={user ? "/patient/medical-records" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Hồ Sơ Y Tế" : "Đăng Nhập Để Xem Hồ Sơ"}
            </Button>
          </Link>
          <Link to={user ? "/patient/prescriptions" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Đơn Thuốc" : "Đăng Nhập Để Xem Đơn Thuốc"}
            </Button>
          </Link>
          <Link to={user ? "/patient/my-appointments" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Lịch Hẹn Của Tôi" : "Đăng Nhập Để Xem Lịch Hẹn"}
            </Button>
          </Link>
          <Link to={user ? "/patient/billing-payments" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Thanh Toán" : "Đăng Nhập Để Thanh Toán"}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
