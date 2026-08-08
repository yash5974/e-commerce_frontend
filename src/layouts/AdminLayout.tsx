import { Outlet } from "react-router-dom";
import { Header } from "../components/layout";

export default function AdminLayout() {
  return (
    <>
      <Header variant="ADMIN" />

      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </>
  );
}
