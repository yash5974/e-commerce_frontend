// src/api/endpoints.ts

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
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
    WEBHOOK: "/webhook/payment",
  },

  ADMIN: {
    PRODUCTS: {
      CREATE: "/admin/products",
      UPDATE: (id: string) => `/admin/products/${id}`,
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
