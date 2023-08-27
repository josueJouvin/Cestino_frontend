import Form from "../components/Form";
import useSwitch from "../hooks/useSwitch";
import useCestino from "../hooks/useCestino"
import Cestino from "../components/Cestino";
import { Link, useLocation } from "react-router-dom";
import GridCestini from "../components/GridCestini";

const ManageCestini = () => {
  const location = useLocation()
  const {show, changeShow} = useSwitch()
  const { cestini } = useCestino()
  const itemsToRender = location.pathname === "/admin/canastas" ? cestini  : cestini.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
  
  return (
    <>
      {show && <Form changeShow={changeShow}/>}
      <section className={`flex flex-col justify-center items-center my-7 container mx-auto overscroll-x-none md:mt-12 ${location.pathname === "/admin" ? "2xl:my-0": ""}`}>
        {cestini.length ? (
          <>
            <h1 className="text-3xl lg:text-4xl text-lime-900 dark:text-slate-200 font-bold 2xl:mb-10 text-center">{location.pathname === "/admin" ? "Ultimas canastas agregadas" : "Todas tus canastas"}</h1>
            <GridCestini>
              {itemsToRender.map((cestino) => ( 
                <Cestino key={cestino._id} cestino={cestino}/>
              ))}
            </GridCestini>
          </>
           
        ) : (
          <>
            <img className="w-64 block" src="/Logo.svg" />
            <h4 className="text-3xl text-lime-900 px-5 dark:text-slate-200">
              Aún no tienes Canastas creadas, comienza creando uno.
            </h4>
          </>
        )}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-12 my-12 md:mb-5">
          {cestini.length > 3 && location.pathname === "/admin" && <Link to="/admin/canastas" className="px-5 py-3 mb-10 md:mb-0 rounded-md bg-lime-600 hover:bg-lime-700 transition-colors text-white font-bold text-xl">
            Todas las canastas
          </Link>}
          <button className={`px-5 py-3 rounded-md bg-lime-600 hover:bg-lime-700 transition-colors text-white font-bold text-xl ${cestini.length ? "fixed left-[8%] bottom-[5%] md:static" : "static" }`} onClick={changeShow}>
            Crear Canasta
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageCestini;
