import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useAuthContext } from "../context/AuthContext";
import UserDropdown from "../components/header/UserDropdown";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user } = useAuthContext();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getRoleDashboardName = (role: string): string => {
    const dashboardNames: { [key: string]: string } = {
      patient: "Bệnh Nhân",
      doctor: "Bác Sĩ",
      pharmacist: "Dược Sĩ",
      admin: "Quản Trị",
      "lab-technician": "Kỹ Thuật Viên",
    };
    return dashboardNames[role] || "Bảng Điều Khiển";
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* Toggle Button */}
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Bật/Tắt Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Welcome Message */}
          <div className="flex-1">
            {user ? (
              <div>
                <h2 className="text-lg  text-gray-800 dark:text-white">
                  Chào mừng, {user.first_name} {user.last_name}
                </h2>
                <p className="text-sm text-gray-500">
                  {getRoleDashboardName(user.user_type)}
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-lg  text-gray-800 dark:text-white">
                  Chào Mừng Đến Với Hệ Thống Chăm Sóc Sức Khỏe
                </h2>
                <p className="text-sm text-gray-500">
                  Cổng Bệnh Nhân (Chế Độ Khách)
                </p>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Tìm kiếm... (Ctrl+K)"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* User Dropdown hoặc Login Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserDropdown user={user} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng Nhập
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Đăng Ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
