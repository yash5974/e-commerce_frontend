import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <AuthCard
        title="Welcome Back"
        description="Sign in to continue shopping."
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
}
