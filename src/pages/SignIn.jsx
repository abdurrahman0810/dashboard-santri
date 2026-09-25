import { useState } from "react";
import { Link, useNavigate } from "react-router"; // Import Link dari react-router
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseAuthStore } from "./auth/store/UseAuthStore";

export default function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = UseAuthStore((state) => state.login);
  const error = UseAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const isSuccess = login(email, password);
    
    if (isSuccess) {
      const currentUser = UseAuthStore.getState().user;
      console.log(currentUser);

      if (currentUser?.role === "admin") {
        navigate("/admin");
      } else if (currentUser?.role === "user") {
        navigate("/user");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm mt-1">Masuk ke akun kamu</p>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          variant="outline"
          className="w-full bg-black text-white"
        >
          Login
        </Button>

        <div className="text-center mt-2">
          <Link to="/sign-up" className="font-medium text-sm">
            Do you not Have Account ? <u className="text-red-600">Sign Up</u>
          </Link>
        </div>
      </div>
    </form>
  );
}
