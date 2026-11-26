// src/api/endpoints.ts

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    UPDATE_PROFILE: "/auth/update/profile",
    LOGOUT: "/auth/logout",
    FORGOT: "/auth/forgot-password",
    RESET: "/auth/reset-password",
    NEW: "/auth/new-password",
  },

  PRODUCTS: {
    LIST: "/products",
    DETAILS: (id: string) => `/products/${id}`,
  },

  CART: {
    GET: "/cart",
    ADD: "/cart",
    UPDATE: (productId: string) => `/cart/${productId}`,
    REMOVE: (productId: string) => `/cart/${productId}`,
    CLEAR: "/cart",
  },

  ORDERS: {
    CREATE: "/orders",
    LIST: "/orders",
    DETAILS: (id: string) => `/orders/${id}`,
  },

  PAYMENTS: {
    INTENT: "/payments/intent",
    GET: (paymentId: string) => `/payments/${paymentId}`,
    DETAILS: (paymentId: string) => `/payments/${paymentId}`,
    STATUS: (paymentId: string) => `/payments/${paymentId}/status`,
    RETRY: (paymentId: string) => `/payments/${paymentId}/retry`,
    REFUND: (paymentId: string) => `/payments/${paymentId}/refund`,
  },

  WEBHOOK: {
    STRIPE: "/webhook/stripe",
    RAZORPAY: "/webhook/razorpay",
  },

  ADMIN: {
    CATEGORIES: {
      LIST: "/admin/categories",
    },

    PRODUCTS: {
      DELETE: (id: string) => `/admin/products/${id}`,
    },

    ORDERS: {
      LIST: "/admin/orders",
      UPDATE_STATUS: (id: string) => `/admin/orders/${id}`,
    },

    INVENTORY: {
      UPDATE: (productId: string) => `/admin/inventory/${productId}`,
    },

    ANALYTICS: {
      SALES: "/admin/analytics/sales",
      REVENUE: "/admin/analytics/revenue",
      TOP_PRODUCTS: "/admin/analytics/top-products",
    },
  },
} as const;

export default API_ENDPOINTS;
