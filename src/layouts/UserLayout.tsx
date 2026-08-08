import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components/layout";

export default function UserLayout() {
  return (
    <>
      <Header variant="USER" />

      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
