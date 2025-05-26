import { Link, useLocation } from "react-router-dom";

interface PageBreadcrumbProps {
  pageTitle: string;
  showBreadcrumb?: boolean;
}

export default function PageBreadcrumb({
  pageTitle,
  showBreadcrumb = true,
}: PageBreadcrumbProps) {
  const location = useLocation();

  const generateBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    const breadcrumbMap: { [key: string]: string } = {
      patient: "Bệnh Nhân",
      doctor: "Bác Sĩ",
      pharmacy: "Dược Sĩ",
      admin: "Quản Trị",
      laboratory: "Phòng Xét Nghiệm",
      dashboard: "Bảng Điều Khiển",
      "medical-records": "Hồ Sơ Y Tế",
      "book-appointment": "Đặt Lịch Hẹn",
      "my-appointments": "Lịch Hẹn Của Tôi",
      prescriptions: "Đơn Thuốc",
      "billing-payments": "Thanh Toán & Hóa Đơn",
      schedule: "Lịch Trình",
      "patient-history": "Lịch Sử Bệnh Nhân",
      diagnosis: "Chẩn Đoán",
      "lab-orders": "Yêu Cầu Xét Nghiệm",
      "medical-reports": "Báo Cáo Y Tế",
      "prescription-verification": "Xác Minh Đơn Thuốc",
      "stock-management": "Quản Lý Kho",
      payments: "Thanh Toán",
      "user-management": "Quản Lý Người Dùng",
      "staff-schedule": "Lịch Trình Nhân Viên",
      "billing-insurance": "Thanh Toán & Bảo Hiểm",
      "test-management": "Quản Lý Xét Nghiệm",
      "test-reports": "Báo Cáo Xét Nghiệm",
      notifications: "Thông Báo",
    };

    return pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
      const displayName = breadcrumbMap[segment] || segment;

      return {
        name: displayName,
        path: path,
        isLast: isLast,
      };
    });
  };

  const breadcrumbs = generateBreadcrumb();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2  text-black dark:text-white">
        {pageTitle}
      </h2>

      {showBreadcrumb && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                to="/"
                className="font-medium text-primary hover:text-primary/80"
              >
                Trang Chủ
              </Link>
            </li>
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                {breadcrumb.isLast ? (
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.path}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
