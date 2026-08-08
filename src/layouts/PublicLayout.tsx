import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components/layout";

export default function PublicLayout() {
  return (
    <>
      <Header variant="PUBLIC" />

      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
