import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { getUserRole } from "@/utils/helpers";

export default function ProtectedRoute() {
  const { isLoading } = useAppSelector((state) => state.auth);

  const location = useLocation();

  const { isAuthenticated, role } = getUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (role !== "USER") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
