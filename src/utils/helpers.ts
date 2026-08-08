import tokenStorage from "@/api/storage";
import type { JwtPayload } from "@/features/auth/hooks/useLogin";
import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const accessToken = tokenStorage.getAccessToken();
  const refreshToken = tokenStorage.getRefreshToken();

  if (!accessToken || !refreshToken) {
    return {
      isAuthenticated: false,
      role: null,
    };
  }

  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);

    // if (!decoded.role) {
    //   return {
    //     isAuthenticated: false,
    //     role: null,
    //   };
    // }

    return {
      isAuthenticated: true,
      role: decoded.role,
    };
  } catch {
    return {
      isAuthenticated: false,
      role: null,
    };
  }
};
