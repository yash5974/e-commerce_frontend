import AuthCard from "../components/AuthCard";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <AuthCard
        title="Forgot Password?"
        description="Enter your email address and we'll send you an OTP to reset your password."
      >
        <ForgotPasswordForm />
      </AuthCard>
    </div>
  );
}
