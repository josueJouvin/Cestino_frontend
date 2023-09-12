import useCestino from "../hooks/useCestino"
import ListProducts from "./ListProducts"

const ProductsForm = ({setFormProducts}) => {
    const { products } = useCestino()

  return (
    <>
    {products.length ?  
        <ul className="mb-4 w-full flex flex-col bg-white dark:bg-slate-200 border-b-2 px-3 py-3 rounded-md">
            <div className="flex items-center border-b-2 py-2 group">
                <p className="w-full font-bold">Productos</p>
                <div className="flex item-center justify-between gap-6 lg:gap-8 mr-14 md:mr-[65px]">
                    <span className="font-bold">Cantidad</span>
                    <span className="font-bold">Precio</span>
                </div>
            </div>
            {products.map(product => (
             <ListProducts key={product.id ? product.id : product._id} product={product} setFormProducts={setFormProducts}/>
            ))}
        </ul> : <p className="text-center dark:text-slate-200 font-semibold my-2 text-lg">Aún no tienes productos ingresados</p>}
    </>
  )
}

export default ProductsForm