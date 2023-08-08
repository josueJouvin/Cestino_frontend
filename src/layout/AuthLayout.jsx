import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <>
    <main className="container mx-auto md:grid md:grid-cols-2 mt-16 lg:mt-0 gap-16 p-5 items-center justify-center lg:h-screen">
      <Outlet/>
    </main>
    </>
  )
}