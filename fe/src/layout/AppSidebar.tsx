import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useAuthContext } from "../context/AuthContext";

const AppSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const { user } = useAuthContext();
  const location = useLocation();

  // Memo hóa menuItems để tránh render lại không cần thiết
  const menuItems = useMemo(() => {
    const userRole = user?.user_type || "patient";

    switch (userRole) {
      case "patient":
        return [
          { path: "/patient/dashboard", label: "Bảng Điều Khiển", icon: "📊" },
          { path: "/patient/medical-records", label: "Hồ Sơ Y Tế", icon: "📋" },
          {
            path: "/patient/book-appointment",
            label: "Đặt Lịch Hẹn",
            icon: "📅",
          },
          {
            path: "/patient/my-appointments",
            label: "Lịch Hẹn Của Tôi",
            icon: "📅",
          },
          { path: "/patient/prescriptions", label: "Đơn Thuốc", icon: "💊" },
          {
            path: "/patient/billing-payments",
            label: "Thanh Toán & Hóa Đơn",
            icon: "💰",
          },
        ];

      case "doctor":
        return [
          { path: "/doctor/dashboard", label: "Bảng Điều Khiển", icon: "📊" },
          { path: "/doctor/schedule", label: "Lịch Trình", icon: "📅" },
          {
            path: "/doctor/patient-history",
            label: "Lịch Sử Bệnh Nhân",
            icon: "👤",
          },
          { path: "/doctor/diagnosis", label: "Chẩn Đoán", icon: "🔬" },
          {
            path: "/doctor/lab-orders",
            label: "Yêu Cầu Xét Nghiệm",
            icon: "🧪",
          },
          {
            path: "/doctor/medical-reports",
            label: "Báo Cáo Y Tế",
            icon: "📋",
          },
        ];

      case "pharmacist":
        return [
          { path: "/pharmacy/dashboard", label: "Bảng Điều Khiển", icon: "📊" },
          {
            path: "/pharmacy/prescription-verification",
            label: "Xác Minh Đơn Thuốc",
            icon: "✅",
          },
          {
            path: "/pharmacy/stock-management",
            label: "Quản Lý Kho",
            icon: "📦",
          },
          { path: "/pharmacy/payments", label: "Thanh Toán", icon: "💰" },
        ];

      case "admin":
        return [
          { path: "/admin/dashboard", label: "Bảng Điều Khiển", icon: "📊" },
          {
            path: "/admin/user-management",
            label: "Quản Lý Người Dùng",
            icon: "👥",
          },
          {
            path: "/admin/staff-schedule",
            label: "Lịch Trình Nhân Viên",
            icon: "📅",
          },
          {
            path: "/admin/billing-insurance",
            label: "Thanh Toán & Bảo Hiểm",
            icon: "💰",
          },
        ];

      case "lab_tech":
        return [
          {
            path: "/laboratory/dashboard",
            label: "Bảng Điều Khiển",
            icon: "📊",
          },
          {
            path: "/laboratory/test-management",
            label: "Quản Lý Xét Nghiệm",
            icon: "🧪",
          },
          {
            path: "/laboratory/test-reports",
            label: "Báo Cáo Xét Nghiệm",
            icon: "📋",
          },
          { path: "/laboratory/notifications", label: "Thông Báo", icon: "🔔" },
        ];

      default:
        return [
          { path: "/patient/dashboard", label: "Bảng Điều Khiển", icon: "📊" },
        ];
    }
  }, [user?.user_type]);

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[290px] transform bg-white shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isExpanded || isHovered ? "lg:w-[290px]" : "lg:w-[90px]"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <div
            className={`transition-all duration-300 ${
              isExpanded || isHovered ? "block" : "hidden lg:block"
            }`}
          >
            <h1 className="text-xl text-gray-800 dark:text-white">
              {isExpanded || isHovered ? "Hệ Thống Chăm Sóc Sức Khỏe" : "CSSK"}
            </h1>
            <p className="text-sm text-gray-500 capitalize">
              {user
                ? getRoleDisplayName(user.user_type)
                : "Cổng Bệnh Nhân (Khách)"}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    title={item.label}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span
                      className={`transition-all duration-300 ${
                        isExpanded || isHovered
                          ? "opacity-100"
                          : "opacity-0 lg:opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info at Bottom hoặc Login Button cho Guest */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          {user
            ? (isExpanded || isHovered) && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              )
            : (isExpanded || isHovered) && (
                <Link
                  to="/signin"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng Nhập
                </Link>
              )}
        </div>
      </aside>
    </>
  );
};

// Helper function để hiển thị tên role bằng tiếng Việt
const getRoleDisplayName = (role: string): string => {
  const roleNames: { [key: string]: string } = {
    patient: "Cổng Bệnh Nhân",
    doctor: "Cổng Bác Sĩ",
    pharmacist: "Cổng Dược Sĩ",
    admin: "Cổng Quản Trị",
    lab_tech: "Cổng Kỹ Thuật Viên",
  };
  return roleNames[role] || "Cổng Người Dùng";
};

export default React.memo(AppSidebar);
