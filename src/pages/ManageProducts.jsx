import Form from "../components/Form";
import useSwitch from "../hooks/useSwitch";
import useCestino from "../hooks/useCestino"
import Cestino from "../components/Cestino";

const ManageProducts = () => {
  const {show, changeShow} = useSwitch()
  const { cestini } = useCestino()
  
  return (
    <>
      {show && <Form changeShow={changeShow}/>}
      <div className="flex flex-col justify-center items-center my-7 container mx-auto xl:px-8 md:mt-12 lg:my-0">
        {cestini.length ? (
            <div className={`grid ${cestini.length > 1 ? `grid-cols-responsive ${cestini.length === 2 ? "w-[75%]" : "w-[90%]"}`: "w-[90%] md:w-[26rem]"} gap-8 lg:gap-12`}>
              {cestini.map((cestino) => ( 
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
        <button className="mt-6 mb-6 2xl:mb-0 px-5 py-3 rounded-md bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold text-xl" onClick={changeShow}>
          Crear Canasta
        </button>
      </div>
    </>
  );
};

export default ManageProducts;
