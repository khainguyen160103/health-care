import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
// import Sidebar from "../components/layout/Sidebar";
// import Sidebar from "../components/Sidebar";
import Header from "../components/layout/Header";

export default function Layout() {
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

  // Redirect to signin if not authenticated
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Auto redirect to appropriate dashboard if user is on root path
  if (location.pathname === "/") {
    const dashboardPath = getDashboardPath(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* <Sidebar userRole={user.role} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

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
      return "/signin";
  }
}
