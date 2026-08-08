import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { getUserRole } from "@/utils/helpers";

export default function GuestRoute() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const { isAuthenticated } = getUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
