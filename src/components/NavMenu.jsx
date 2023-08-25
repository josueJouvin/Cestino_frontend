import Header from "./Header";
import {Products, Customers, User, ExportPDF, LogOut, Day, Close,} from "./Icons";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

const NavMenu = ({ changeShow, show }) => {
  const { logOut, auth } = useAuth();

  return (
    <aside className="bg-lime-600 px-5 flex flex-col text-white font-semibold md:text-xl lg:w-1/5">
      <Header />
      <section
        className={`fixed z-10 bottom-0 right-0 duration-75 bg-lime-600 w-1/2 p-2 rounded-tl-lg border-t-2 border-l-2 border-lime-700 lg:h-full lg:static lg:z-0 lg:border-0 lg:w-full lg:p-0 lg:rounded-none lg:border-none ${
          !show && "hidden lg:block"
        }`}
      >
        <div className="lg:flex lg:flex-col lg:h-full lg:justify-between">
        <div className="flex flex-col gap-4 justify-center">
      <NavLink to="/admin/canastas" className={({ isActive }) => `flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors ${isActive  ? "bg-lime-700" : ""}`}>
        <Products /> Canastas
      </NavLink>
      <NavLink to="/admin/clientes" className={({ isActive }) => `flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors ${isActive && "bg-lime-700"}`}>
        <Customers /> Clientes
      </NavLink>
      <NavLink to="/admin/perfil" className={({ isActive }) => `flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors ${isActive && "bg-lime-700"}`}>
        <User /> Perfil
      </NavLink>
      <NavLink to="/admin/exportar" className={({ isActive }) => `flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors ${isActive && "bg-lime-700"}`}>
        <ExportPDF /> Exportar Pdf
      </NavLink>
    </div>

          <div className="border-t-2 border-lime-700 flex flex-col gap-3 justify-center w-full my-5">
            <button className="flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors mt-2">
              <Day /> Modo Claro
            </button>
            <button
              className="flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors"
              onClick={logOut}
            >
              <LogOut /> Cerrar Cesion
            </button>
            <div className="hidden md:flex md:items-center justify-center md:justify-normal md:gap-2 md:py-2 lg:text-base">
              <span className="rounded-full bg-orange-500 w-10 h-10 p-4 flex items-center justify-center">
                {auth.name && auth.name.slice(0,1) }
              </span>
              <div>
                <span>{auth.name}</span>
                <p>{auth.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mr-4 mb-7 lg:hidden">
          <button onClick={changeShow}>
            <Close />
          </button>
        </div>
      </section>
    </aside>
  );
};

export default NavMenu;
