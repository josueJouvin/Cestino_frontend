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
      <div className="flex flex-col justify-center items-center my-7 container mx-auto px-3 md:px-8 md:mt-12 lg:px-5 lg:my-0">
        {cestini.length ? (
          <>
            {cestini.map((cestino) => ( 
              <Cestino key={cestino._id} cestino={cestino}/>
            ))}
          </>
        ) : (
          <>
            <img className="w-64 block" src="/Logo.svg" />
            <h4 className="text-3xl text-lime-900">
              Aún no tienes Canastas creadas, comienza creando uno.
            </h4>
          </>
        )}
        <button className="mt-6 px-5 py-3 rounded-md bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold text-xl" onClick={changeShow}>
          Crear Canasta
        </button>
      </div>
    </>
  );
};

export default ManageProducts;
