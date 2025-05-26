import { useQuery } from "@tanstack/react-query";
import {
  authService,
  appointmentService,
  billingService,
} from "../../services";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { UserIcon, CalenderIcon, DollarLineIcon } from "../../icons";

export default function AdminDashboard() {
  // Mock data for demonstration
  const stats = {
    totalUsers: 1250,
    totalAppointments: 85,
    totalRevenue: 125000000,
    pendingApprovals: 12,
  };

  return (
    <>
      <PageMeta
        title="Bảng Điều Khiển Quản Trị | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Bảng điều khiển quản trị hệ thống"
      />
      <PageBreadcrumb pageTitle="Bảng Điều Khiển Quản Trị" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <ComponentCard title="Tổng Người Dùng">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {stats.totalUsers.toLocaleString("vi-VN")}
              </p>
              <p className="text-sm text-gray-500">Đang Hoạt Động</p>
            </div>
            <UserIcon className="h-8 w-8 text-primary" />
          </div>
        </ComponentCard>

        <ComponentCard title="Lịch Hẹn Hôm Nay">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-success">
                {stats.totalAppointments}
              </p>
              <p className="text-sm text-gray-500">Cuộc Hẹn</p>
            </div>
            <CalenderIcon className="h-8 w-8 text-success" />
          </div>
        </ComponentCard>

        <ComponentCard title="Doanh Thu Tháng">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-warning">
                {stats.totalRevenue.toLocaleString("vi-VN")}đ
              </p>
              <p className="text-sm text-gray-500">VNĐ</p>
            </div>
            <DollarLineIcon className="h-8 w-8 text-warning" />
          </div>
        </ComponentCard>

        <ComponentCard title="Chờ Duyệt">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-error">
                {stats.pendingApprovals}
              </p>
              <p className="text-sm text-gray-500">Yêu Cầu</p>
            </div>
            {/* <ClipboardIcon className="h-8 w-8 text-error" /> */}
          </div>
        </ComponentCard>
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <ComponentCard title="Hoạt Động Gần Đây">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Người dùng mới đăng ký
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nguyễn Văn A đã tạo tài khoản bệnh nhân
                </p>
              </div>
              <span className="text-sm text-gray-500">2 phút trước</span>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Lịch hẹn mới
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Trần Thị B đã đặt lịch khám với BS. Nguyễn Văn C
                </p>
              </div>
              <span className="text-sm text-gray-500">5 phút trước</span>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Thanh toán hoàn tất
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hóa đơn #HD001 đã được thanh toán
                </p>
              </div>
              <span className="text-sm text-gray-500">10 phút trước</span>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Thao Tác Nhanh
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/user-management">
            <Button className="w-full">Quản Lý Người Dùng</Button>
          </Link>
          <Link to="/admin/staff-schedule">
            <Button variant="outline" className="w-full">
              Lịch Trình Nhân Viên
            </Button>
          </Link>
          <Link to="/admin/billing-insurance">
            <Button variant="outline" className="w-full">
              Thanh Toán & Bảo Hiểm
            </Button>
          </Link>
          <Link to="/admin/reports">
            <Button variant="outline" className="w-full">
              Báo Cáo Hệ Thống
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
