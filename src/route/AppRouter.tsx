import { createBrowserRouter } from "react-router-dom";

import { LoginPage, RegisterPage } from "@/features/auth";
import { CartPage } from "@/features/cart";
import CheckoutPage from "@/features/orders/pages/CheckoutPage";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import { ProductDetailsPage, ProductsPage } from "@/features/products";
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
import { PaymentPage } from "@/features/payments";

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
        // children: [
        //   {
        //     path: "/admin",
        //     element: <AdminDashboardPage />,
        //   },
        // ],
      },
    ],
  },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <Notfound /> },
]);

export default AppRouter;
