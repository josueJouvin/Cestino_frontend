import Header from "./Header";
import Links from "./Links";
import { Products, Customers, User, ExportPDF, LogOut, Day, Close } from "./Icons";
import useAuth from "../hooks/useAuth";

const NavMenu = () => {
  const { logOut } = useAuth();

  return (
    <aside className="bg-lime-600 px-5 flex flex-col text-white font-semibold md:text-xl lg:w-1/5">
      <Header />
      <section className="fixed z-10 lg:h-full bottom-0 right-0 duration-75 bg-lime-600 w-1/2 p-2 rounded-tl-lg border-t-2 border-l-2 border-lime-700 lg:static lg:z-0 lg:border-0 lg:w-full lg:p-0 lg:rounded-none lg:border-none">
      
      <div className="lg:flex lg:flex-col lg:h-full lg:justify-between">
        <div className="flex flex-col gap-4 justify-center">
          <Links>
            <Products /> Productos
          </Links>
          <Links>
            <Customers /> Clientes
          </Links>
          <Links>
            <User /> Perfil
          </Links>
          <Links>
            <ExportPDF /> Exportar Pdf
          </Links>
        </div>

        <div className="border-t-2 border-lime-700 flex flex-col gap-3 justify-center w-full my-5">
          <button className="flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors mt-2"><Day/> Modo Claro</button>
          <button className="flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors" onClick= {logOut}> 
            <LogOut/> Cerrar Cesion
          </button>
          <div className="hidden md:flex md:items-center md:gap-3 md:py-2 lg:text-base">
            <span className="rounded-full bg-orange-500 w-10 h-10 p-4 flex items-center justify-center">J</span>
            <div>
              <span>Josue Garces</span>
              <p>josuegj2001@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mr-4 mb-7 lg:hidden">
        <button>
          <Close/>
        </button>
      </div>
      </section>
    </aside>
  );
};

export default NavMenu;
