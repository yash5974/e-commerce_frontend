import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout";

export default function AuthLayout() {
  return (
    <>
      <Header variant="AUTH" />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <Outlet />
      </main>
    </>
  );
}
