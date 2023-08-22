import Form from "../components/Form";
import useSwitch from "../hooks/useSwitch";
import useCestino from "../hooks/useCestino"
import Cestino from "../components/Cestino";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const {show, changeShow} = useSwitch()
  const { cestini } = useCestino()
  
  return (
    <>
      {show && <Form changeShow={changeShow}/>}
      <section className="flex flex-col justify-center items-center my-7 container mx-auto xl:px-8 md:mt-12">
        {cestini.length ? (
            <div className={`grid ${cestini.length > 1 ? "grid-cols-responsive w-[90%] xl:w-[85%]": "w-[90%] md:w-[26rem]"} gap-8 lg:gap-12`}>
              {cestini.slice(0,3).map((cestino) => ( 
                <Cestino key={cestino._id} cestino={cestino}/>
              ))}
            </div>
        ) : (
          <>
            <img className="w-64 block" src="/Logo.svg" />
            <h4 className="text-3xl text-lime-900 px-5">
              Aún no tienes Canastas creadas, comienza creando uno.
            </h4>
          </>
        )}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-12 my-12">
          {cestini.length > 3 && <Link className="px-5 py-3 rounded-md bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold text-xl">
            Ver mas canastas
          </Link>}
          <button className={`px-5 py-3 rounded-md bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold text-xl ${cestini.length ? "fixed left-[8%] bottom-[5%] md:static" : "static" }`} onClick={changeShow}>
            Crear Canasta
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageProducts;
