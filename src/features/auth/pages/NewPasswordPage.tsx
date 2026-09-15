import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

import AuthCard from "../components/AuthCard";
import NewPasswordForm from "../components/NewPasswordForm";

interface LocationState {
  userId?: string;
}

export default function NewPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  const userId = state?.userId;

  if (!userId) {
    return (
      <div className="w-full max-w-md">
        <AuthCard
          title="Invalid Reset Request"
          description="Your password reset session is invalid or has expired."
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please start the password recovery process again.
            </p>

            <Button
              type="button"
              className="w-full"
              onClick={() => navigate("/forgot-password")}
            >
              Start Again
            </Button>

            <Button type="button" variant="outline" className="w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <AuthCard
        title="Create New Password"
        description="Enter a strong password for your account."
      >
        <NewPasswordForm userId={userId} />
      </AuthCard>
    </div>
  );
}
