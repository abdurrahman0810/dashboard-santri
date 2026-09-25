import { Navigate, Outlet } from "react-router";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";

// Guard untuk proteksi halaman /admin dan /user
export function ProtectedRoute({ allowedRole }) {
  const user = UseAuthStore((state) => state.user);

  if (!user) {
    // 1. Jika BELUM login, lempar ke halaman sign-in
    return <Navigate to="/sign-in" replace />;
  } else if (user.role !== allowedRole) {
    // 2. Jika SUDAH login tapi coba akses URL role lain (misal user ketik /admin)
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "user") {
      return <Navigate to="/user" replace />;
    }
  }

  // 3. Jika role sesuai, tampilkan halaman
  return <Outlet />;
}

// Guard untuk proteksi halaman Sign In / Sign Up
export function AuthGuard() {
  const user = UseAuthStore((state) => state.user);

  if (user) {
    // Jika SUDAH login, cegah masuk ke /sign-in (harus Logout dulu)
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "user") {
      return <Navigate to="/user" replace />;
    }
  }

  // Jika BELUM login, izinkan ke form Sign In / Sign Up
  return <Outlet />;
}