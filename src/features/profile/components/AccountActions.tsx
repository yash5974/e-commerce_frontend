import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { Button } from "@/ui/button";

export default function AccountActions() {
  const navigate = useNavigate();

  const { logout, isLoading } = useLogout();

  const handleLogout = async () => {
    if (isLoading) {
      return;
    }

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      // Logout errors remain owned by the existing Auth implementation.
    }
  };

  return (
    <section className="rounded-lg border p-4 sm:p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">Account Actions</h2>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Manage your account session.
          </p>
        </div>

        <div className="w-full sm:w-auto sm:shrink-0">
          <Button
            type="button"
            variant="destructive"
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={() => {
              void handleLogout();
            }}
          >
            <LogOut className="mr-2 size-4" />
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </section>
  );
}
