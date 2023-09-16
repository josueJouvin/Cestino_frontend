import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <nav className="bg-lime-900 text-slate-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-4xl p-5">
        <Link
          to={"/"}
          className="flex items-center gap-2 transform hover:scale-95 transition-all"
        >
          <h2>Cestino</h2>
          <img className="h-12" src="/Logo.svg" alt="Cestino app" />
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-14 font-semibold text-xl md:text-2xl mt-5 mb-2 md:my-0">
          <Link
            className="border-2 border-lime-600 p-2 rounded-md transform hover:scale-95 transition-all"
            to={"/auth"}
          >
            Iniciar sesion
          </Link>
          <Link
            className="border-2 border-lime-600 p-2 rounded-md transform hover:scale-95 transition-all"
            to={"/auth/registrar"}
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
