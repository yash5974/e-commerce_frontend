import { Badge } from "@/ui/badge";
import { useAppSelector } from "@/store/hooks";

const ProfileSummary = () => {
  const { user, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  if (isLoading) {
    return (
      <section className="rounded-lg border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 rounded bg-muted" />
          <div className="h-4 w-56 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-6 w-24 rounded bg-muted" />
        </div>
      </section>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <section className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          User information is not available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Profile Summary</h2>
        <p className="text-sm text-muted-foreground">
          View your account information.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <p className="font-medium">{user.role}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-muted-foreground">Account Status</p>

          <Badge
            variant={
              user.role
                ? "default"
                : user.role === undefined
                  ? "secondary"
                  : "outline"
            }
          >
            {user.role
              ? "Active"
              : user.role === undefined
                ? "Inactive"
                : "Unknown"}
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;
