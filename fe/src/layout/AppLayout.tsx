import { useEffect } from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Cho phép guest access cho patient routes
  const isPatientRoute = location.pathname.startsWith('/patient');
  
  // Nếu không có user và không phải patient route, redirect to signin
  if (!user && !isPatientRoute) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Auto redirect to appropriate dashboard if user is on root path
  if (location.pathname === "/") {
    if (user) {
      const dashboardPath = getDashboardPath(user.role);
      return <Navigate to={dashboardPath} replace />;
    } else {
      // Guest user - redirect to patient dashboard
      return <Navigate to="/patient/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

// Helper function to get dashboard path based on role
function getDashboardPath(role: string): string {
  switch (role) {
    case "patient":
      return "/patient/dashboard";
    case "doctor":
      return "/doctor/dashboard";
    case "pharmacist":
      return "/pharmacy/dashboard";
    case "admin":
      return "/admin/dashboard";
    case "lab-technician":
      return "/laboratory/dashboard";
    default:
      return "/patient/dashboard"; // Default cho guest
  }
}

export default AppLayout;
