import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex w-1/2">
      
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>                          
      </div>
    </div>
  );
}
export default AuthLayout 
