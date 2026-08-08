import api from "./axios";
import { setupInterceptors } from "./interceptors";

let initialized = false;
export const initializeApi = () => {
  if (initialized) return;
  setupInterceptors(api);
  initialized = true;
};
initializeApi();

export default api;
