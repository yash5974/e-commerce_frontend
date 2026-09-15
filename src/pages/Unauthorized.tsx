import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>

        <p className="mt-6 text-6xl font-bold tracking-tight">403</p>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Access denied
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          You don&apos;t have permission to access this page. Please contact an
          administrator if you believe this is a mistake.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
