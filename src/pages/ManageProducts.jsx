
const ManageProducts = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center my-7 container mx-auto px-3 md:px-8 md:mt-12 lg:px-5 lg:my-0">
      <img className="w-64 block" src="/Logo.svg"/>
      <h4 className="text-3xl text-lime-900">
        Aún no tienes Canastas creadas, comienza creando uno.
      </h4>
      <button className="mt-6 px-5 py-3 rounded-md bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold text-xl">Crear Producto</button>
    </div>
    </>
  );
};

export default ManageProducts;
