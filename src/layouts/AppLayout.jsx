import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";

export default function AppLayout() {
  const user = UseAuthStore((state) => state.user);
  const logout = UseAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-10 py-4">
        <nav className="flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-emerald-400">Home</Link>
          <a href="#about" className="hover:text-emerald-400">About</a>
          <a href="#testimony" className="hover:text-emerald-400">Testimony</a>
          <a href="#faq" className="hover:text-emerald-400">FAQ</a>
        </nav>

        <div>
          <h1 className="text-center text-xl font-bold text-emerald-500">
            Dashboard Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-300">
            Halo, <b className="text-emerald-400">{user?.name || "Admin"}</b>
          </span>
          <Button onClick={handleLogout} variant="destructive" size="sm" className="text-xs">
            Logout
          </Button>
        </div>
      </header>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}