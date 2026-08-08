import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProfilePage() {
  const { user, isLoading, fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    void fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="space-y-2">
      <h1>{user.name}</h1>

      <p>{user.email}</p>

      <p>{user.role}</p>
    </div>
  );
}
