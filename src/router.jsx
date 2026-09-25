import { createBrowserRouter } from "react-router";

import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import UserLayout from "./layouts/UserLayout";
import AppLayout from "./layouts/AppLayout";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/user/Dashboard";
import MyProfile from "./pages/user/MyProfile";

import DashboardAdmin from "./pages/admin/Dashboard";
import MyProfileAdmin from "./pages/admin/MyProfile";

// Import SecurityGuard dari folder components
import { ProtectedRoute, AuthGuard } from "./components/SecurityGuard";

const router = createBrowserRouter([
  // Rute Auth (Sign In & Sign Up): Jika SUDAH login, TIDAK BISA diakses lagi
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/sign-in", element: <SignIn /> },
          { path: "/sign-up", element: <SignUp /> },
        ],
      },
    ],
  },

  // Rute Public Home
  {
    element: <GuestLayout />,
    children: [{ path: "/", element: <Home /> }],
  },

  // Rute Admin: Hanya bisa diakses jika user.role === "admin"
  {
    path: "/admin",
    element: <ProtectedRoute allowedRole="admin" />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardAdmin /> },
          { path: "my-profile", element: <MyProfileAdmin /> },
        ],
      },
    ],
  },

  // Rute User: Hanya bisa diakses jika user.role === "user"
  {
    path: "/user",
    element: <ProtectedRoute allowedRole="user" />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "my-profile", element: <MyProfile /> },
        ],
      },
    ],
  },
]);

export default router;