import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

function GuestLayout() {

  
  return (
    <div className="min-h-screen w-full">
      <header className="flex items-center justify-between border-b px-10 py-4">
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#testimony">Testimony</a>
          <a href="#faq">FAQ</a>
        </nav>
        <Button asChild>
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default GuestLayout;
