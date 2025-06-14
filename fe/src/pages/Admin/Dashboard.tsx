import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

export default function AdminDashboard() {
  // Expanded mock data for demonstration
  const stats = {
    totalUsers: 1250,
    totalAppointments: 85,
    totalRevenue: 125000000,
    pendingApprovals: 12,
    totalDoctors: 45,
    totalPatients: 980,
    totalPharmacists: 15,
    totalLabTechs: 8,
    monthlyGrowth: 12.5,
    systemUptime: 99.8,
  };

  const recentActivities = [
    {
      id: 1,
      action: "Người dùng mới đăng ký",
      user: "Nguyễn Văn A",
      role: "Bệnh nhân",
      time: "5 phút trước",
      type: "user_register"
    },
    {
      id: 2,
      action: "Bác sĩ cập nhật hồ sơ",
      user: "BS. Trần Thị B",
      role: "Bác sĩ",
      time: "15 phút trước",
      type: "profile_update"
    },
    {
      id: 3,
      action: "Thanh toán hóa đơn",
      user: "Lê Văn C",
      role: "Bệnh nhân",
      time: "30 phút trước",
      type: "payment"
    },
    {
      id: 4,
      action: "Tạo lịch hẹn mới",
      user: "Phạm Thị D",
      role: "Bệnh nhân",
      time: "1 giờ trước",
      type: "appointment"
    },
    {
      id: 5,
      action: "Cập nhật kết quả xét nghiệm",
      user: "KTV. Hoàng Văn E",
      role: "Kỹ thuật viên",
      time: "2 giờ trước",
      type: "lab_result"
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "Hệ thống backup sẽ chạy vào 2:00 AM",
      time: "Hôm nay"
    },
    {
      id: 2,
      type: "info",
      message: "Cập nhật hệ thống thành công",
      time: "Hôm qua"
    },
    {
      id: 3,
      type: "error",
      message: "Lỗi kết nối database tạm thời đã được khắc phục",
      time: "2 ngày trước"
    }
  ];

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
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
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
            <svg className="h-8 w-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 4h6m-6 0a1 1 0 00-1 1v8a1 1 0 001 1h6a1 1 0 001-1v-8a1 1 0 00-1-1" />
            </svg>
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
            <svg className="h-8 w-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
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
      </div>      {/* Recent Activities & System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ComponentCard title="Hoạt Động Gần Đây">
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user_register' ? 'bg-green-500' :
                    activity.type === 'profile_update' ? 'bg-blue-500' :
                    activity.type === 'payment' ? 'bg-yellow-500' :
                    activity.type === 'appointment' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {activity.action}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.user} ({activity.role})
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </ComponentCard>

        <ComponentCard title="Cảnh Báo Hệ Thống">
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${
                    alert.type === 'error' ? 'text-red-800 dark:text-red-200' :
                    alert.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                    'text-blue-800 dark:text-blue-200'
                  }`}>
                    {alert.message}
                  </p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* System Statistics */}
      <div className="mt-6">
        <ComponentCard title="Thống Kê Chi Tiết">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.totalDoctors}</p>
              <p className="text-sm text-gray-500">Bác sĩ</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.totalPatients}</p>
              <p className="text-sm text-gray-500">Bệnh nhân</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.totalPharmacists}</p>
              <p className="text-sm text-gray-500">Dược sĩ</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.totalLabTechs}</p>
              <p className="text-sm text-gray-500">Kỹ thuật viên</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">+{stats.monthlyGrowth}%</p>
                <p className="text-sm text-gray-500">Tăng trưởng tháng</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-blue-600">{stats.systemUptime}%</p>
                <p className="text-sm text-gray-500">Thời gian hoạt động</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-purple-600">{stats.pendingApprovals}</p>
                <p className="text-sm text-gray-500">Chờ phê duyệt</p>
              </div>
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
