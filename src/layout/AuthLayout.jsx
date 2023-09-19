import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const AuthLayout = () => {
  return (
    <>
      <ToastContainer limit={3} />
      <main className="container mx-auto md:grid md:grid-cols-2 mt-16 lg:mt-0 gap-16 p-5 items-center justify-center lg:h-screen">
        <Outlet />
      </main>
    </>
  );
};
