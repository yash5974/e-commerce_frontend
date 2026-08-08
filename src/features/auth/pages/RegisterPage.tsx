import AuthCard from "../components/AuthCard";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <AuthCard
        title="Create Account"
        description="Create your account to start shopping."
      >
        <RegisterForm />
      </AuthCard>
    </div>
  );
}
