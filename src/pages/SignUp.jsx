import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Buat akun baru
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Input type="text" placeholder="Username" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </div>

      <div className="flex flex-col gap-2">
        <Button className="w-full">Sign Up</Button>
        <Button asChild variant="outline" className="w-full">
          <Link to="/sign-in">
            Sudah punya akun? <u className="text-blue-600">Sign In</u>
          </Link>
        </Button>
      </div>
    </div>
  );
}