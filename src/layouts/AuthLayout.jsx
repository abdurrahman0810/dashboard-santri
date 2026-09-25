import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 antialiased flex flex-col justify-center">
      <Outlet />
    </div>
  );
}