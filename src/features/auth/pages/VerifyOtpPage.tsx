import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

import AuthCard from "../components/AuthCard";
import OtpVerificationForm from "../components/OtpVerificationForm";

interface LocationState {
  email?: string;
}

export default function VerifyOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  const email = state?.email;

  if (!email) {
    return (
      <div className="w-full max-w-md">
        <AuthCard
          title="Invalid Reset Request"
          description="Please start the password reset process again."
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We could not determine which account this OTP belongs to.
            </p>

            <Button
              type="button"
              className="w-full"
              onClick={() => navigate("/forgot-password")}
            >
              Start Again
            </Button>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <AuthCard
        title="Verify OTP"
        description={`Enter the 6-digit code sent to ${email}.`}
      >
        <OtpVerificationForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Entered the wrong email?{" "}
          <Link
            to="/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            Start again
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
