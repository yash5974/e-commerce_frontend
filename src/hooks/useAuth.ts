import type { CurrentUser } from "@/features/profile";

export interface UseAuthReturn {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: CurrentUser | null;
  refreshUser: () => Promise<void>;
}
