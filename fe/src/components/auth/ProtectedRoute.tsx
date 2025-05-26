// filepath: fe/src/components/auth/ProtectedRoute.tsx
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  allowGuest?: boolean;
}

const ProtectedRoute = ({
  allowedRoles,
  allowGuest = false,
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!user && !allowGuest) {
      if (location.pathname !== "/signin") {
        navigate("/signin", { replace: true, state: { from: location } });
      }
      return;
    }
    if (
      user &&
      allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.user_type)
    ) {
      navigate(`/${user.user_type}/dashboard`, { replace: true });
    }
  }, [user, isLoading, allowedRoles, allowGuest, navigate, location]);

  if (isLoading) return null;
  if (!user && !allowGuest) return null;
  if (
    user &&
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.user_type)
  )
    return null;

  return <Outlet />;
};

export default ProtectedRoute;
