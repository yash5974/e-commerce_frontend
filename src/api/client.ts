import type { AxiosRequestConfig } from "axios";
import api from "./index";

export const apiClient = {
  get<TResponse>(url: string, config?: AxiosRequestConfig) {
    return api.get<TResponse>(url, config).then((res) => res.data);
  },

  post<TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
    config?: AxiosRequestConfig,
  ) {
    return api.post<TResponse>(url, body, config).then((res) => res.data);
  },

  put<TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
    config?: AxiosRequestConfig,
  ) {
    return api.put<TResponse>(url, body, config).then((res) => res.data);
  },

  patch<TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
    config?: AxiosRequestConfig,
  ) {
    return api.patch<TResponse>(url, body, config).then((res) => res.data);
  },

  delete<TResponse>(url: string, config?: AxiosRequestConfig) {
    return api.delete<TResponse>(url, config).then((res) => res.data);
  },
};
