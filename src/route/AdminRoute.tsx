import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { getUserRole } from "@/utils/helpers";

export default async function AdminRoute() {
  const { isLoading } = useAppSelector((state) => state.auth);

  const location = useLocation();
  const { isAuthenticated, role } = await getUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  /**
   * Not authenticated
   *
   * Save the requested admin URL so that
   * login can return the user there.
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }

  if (role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
