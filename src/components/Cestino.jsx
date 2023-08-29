import useCestino from "../hooks/useCestino";
import useSwitch from "../hooks/useSwitch";
import Form from "./Form";
import { useLocation } from "react-router-dom";
import ProductsCestino from "./ProductsCestino";

const Cestino = ({ cestino }) => {
  const {setEdit, setEditMode, deletedCestino} = useCestino()
  const {show, changeShow} = useSwitch()
  const { name, profit, total, products} = cestino;
  const location = useLocation()

  function handleEdit(cestino) {
    setEdit(cestino) 
    changeShow()
    setEditMode(true)
  }
  
  return (
    <>
    {show && <Form changeShow={changeShow}/>}
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-200/95 bg-clip-border text-gray-700 shadow-lg mt-14 2xl:mt-5 ">
      <div className="mx-14 md:mx-20 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-lime-500 to-lime-600"></div>
      <section className="flex justify-between h-full flex-col">
      <div className="p-6">
        <h5 className="mt-2 mb-5 text-center text-2xl font-bold text-blue-gray-900 text-black antialiased">
          {name}
        </h5>
        <ul className="list-decimal">
          <p className="text-lg font-bold mb-2">Productos:</p>
          {products.slice(0,4).map((product) => (
            <ProductsCestino key={product._id} product={product}/>
          ))}
          {products.length > 4 && <p className="text-black font-semibold">Otros Productos...</p>}
        </ul>
        <section className="border-t-2 border-gray-400 dark:border-gray-900 flex flex-col gap-2 mt-5 items-end font-semibold text-black text-lg">
          <span className="mt-2">Ganancia: ${profit ? profit : 0}</span>
          <span>Precio de Canasta: ${Number(total).toFixed(2)}</span>
        </section>
      </div>
      <section className="p-6 pt-0 flex justify-between">
        <button
          onClick={() => handleEdit(cestino)}
          type="button"
          className="rounded-lg bg-blue-600 py-3 px-5 text-center text-sm font-bold uppercase text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"
        >
          { location.pathname === "/admin/canastas" ? "Ver Canasta" : "editar" }
        </button>
        <button
          onClick={() => deletedCestino(cestino._id)}
          type="button"
          className="rounded-lg bg-red-600 py-3 px-5 text-center text-sm font-bold uppercase text-white hover:bg-red-700 shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"
        >
          Eliminar
        </button>
      </section>
      </section>
    </div>
    </>
  );
};

export default Cestino;