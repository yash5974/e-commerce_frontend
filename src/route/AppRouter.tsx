import { createBrowserRouter } from "react-router-dom";

import {
  AdminRevenueAnalyticsPage,
  AdminSalesAnalyticsPage,
  AdminTopProductsAnalyticsPage,
} from "@/features/analytics";
import {
  ForgotPasswordPage,
  LoginPage,
  NewPasswordPage,
  RegisterPage,
  VerifyOtpPage,
} from "@/features/auth";
import { CartPage } from "@/features/cart";
import {
  AdminOrdersPage,
  CheckoutPage,
  OrderDetailsPage,
  OrdersPage,
} from "@/features/orders";
import {
  AdminPaymentDetailsPage,
  PaymentPage,
  PaymentResultPage,
} from "@/features/payments";
import RetryPaymentPage from "@/features/payments/pages/RetryPaymentPage";
import {
  AdminProductCreatePage,
  AdminProductEditPage,
  ProductDetailsPage,
  ProductsPage,
} from "@/features/products";
import AdminProductsPage from "@/features/products/pages/AdminProductsPage";
import ProductPage from "@/features/products/pages/ProductPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";
import UserLayout from "@/layouts/UserLayout";
import Notfound from "@/pages/Notfound";
import Unauthorized from "@/pages/Unauthorized";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import About from "@/pages/About";

const AppRouter = createBrowserRouter([
  /**
   * Public Routes
   */
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <ProductPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  /**
   * Guest Routes
   */
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/reset-password",
            element: <VerifyOtpPage />,
          },
          {
            path: "/new-password",
            element: <NewPasswordPage />,
          },
        ],
      },
    ],
  },

  /**
   * Protected User Routes
   */
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/orders",
            element: <OrdersPage />,
          },
          {
            path: "/orders/:id",
            element: <OrderDetailsPage />,
          },
          {
            path: "/payment/:orderId",
            element: <PaymentPage />,
          },
          {
            path: "/payments/:paymentId",
            element: <PaymentResultPage />,
          },
          {
            path: "/payments/:paymentId/retry",
            element: <RetryPaymentPage />,
          },
        ],
      },
    ],
  },

  /**
   * Protected Admin Routes
   */
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/products",
            element: <AdminProductsPage />,
          },
          {
            path: "/admin/products/new",
            element: <AdminProductCreatePage />,
          },
          {
            path: "/admin/products/:id/edit",
            element: <AdminProductEditPage />,
          },
          {
            path: "/admin/orders",
            element: <AdminOrdersPage />,
          },
          {
            path: "/admin/payments/:paymentId",
            element: <AdminPaymentDetailsPage />,
          },
          {
            path: "/admin/analytics/sales",
            element: <AdminSalesAnalyticsPage />,
          },
          {
            path: "/admin/analytics/revenue",
            element: <AdminRevenueAnalyticsPage />,
          },
          {
            path: "/admin/analytics/top-products",
            element: <AdminTopProductsAnalyticsPage />,
          },
        ],
      },
    ],
  },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <Notfound /> },
]);

export default AppRouter;
