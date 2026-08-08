import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import API_ENDPOINTS from "./endpoints";
import refreshApi from "./refreshApi";
import tokenStorage from "./storage";

interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, accessToken: string | null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
      return;
    }

    if (!accessToken) {
      reject(new Error("Access token unavailable after refresh."));
      return;
    }

    resolve(accessToken);
  });

  failedQueue = [];
};

const refreshAccessToken = async (
  refreshToken: string,
  accessToken: string,
): Promise<string> => {
  const response = await refreshApi.post<RefreshResponse>(
    API_ENDPOINTS.AUTH.REFRESH,
    {
      refreshToken,
    },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const newAccessToken = response.data.data.accessToken;

  if (!newAccessToken) {
    throw new Error("Refresh response did not contain an access token.");
  }

  tokenStorage.setAccessToken(newAccessToken);

  return newAccessToken;
};

export const setupInterceptors = (instance: AxiosInstance): void => {
  /**
   * REQUEST
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken = tokenStorage.getAccessToken();

      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: unknown) => Promise.reject(error),
  );

  /**
   * RESPONSE
   */
  instance.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as RetryAxiosRequestConfig;

      /**
       * Only handle HTTP 401 responses.
       */
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      /**
       * Never retry an already retried request.
       */
      if (originalRequest._retry) {
        tokenStorage.clear();

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      /**
       * Queue requests while another refresh is running.
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.authorization = `Bearer ${token}`;

              resolve(instance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();

        const accessToken = tokenStorage.getAccessToken();

        if (!refreshToken) {
          throw new Error("Refresh token not found.");
        }

        if (!accessToken) {
          throw new Error("Access token not found.");
        }

        const newAccessToken = await refreshAccessToken(
          refreshToken,
          accessToken,
        );

        processQueue(null, newAccessToken);

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        tokenStorage.clear();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
};
