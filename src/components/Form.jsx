import ButtomInput from "./ButtomInput";
import { Check, Close, EditIcon, TrashIcon } from "./Icons";

const Form = () => {
  return (
    <section className="absolute inset-0">
      <div className=" inset-0 fixed grid place-items-center bg-gray-800/80 overflow-y-auto z-10">
        <form className="bg-slate-200 md:w-3/4 xl:w-3/5 2xl:w-1/2 p-7 mx-auto rounded-xl">

            <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-2xl text-lime-600">CESTINO</span>
                <Close/>
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="inline-block text-gray-800 font-bold mb-2">Imagen</label>
                <input type="file" id="image" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500"/>
            </div>

            { /*input de canasta*/}
            <div className="mb-4">
                <label htmlFor="cestino_name" className="inline-block text-gray-800 font-bold mb-2">Nombre de Canasta</label>
                <input type="text" id="cestino_name" name="cestino_name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" placeholder="Canasta de Víveres, Torta de Chocolate, ..." required/>
            </div>

            {/*input de productos*/}
            <div className="mb-4">
                <label htmlFor="product_name" className="inline-block text-gray-800 font-bold mb-2">Producto</label>
                <div className="flex gap-3 items-center flex-wrap md:flex-nowrap">
                    <input type="text" id="product_name" name="product_name" className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" placeholder="Carne, Aceite, Chocolate, Manzana, ..." required/>
                    <input type="number" id="quantity" name="quantity" placeholder="Cantidad" className="w-28 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-lime-500" min="1" required/>
                    <select id="unidad" name="unidad" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500">
                    <option value="">-- Medidas --</option>
                        <optgroup label="Masa">
                            <option value="kilos">kilos</option>
                            <option value="libras">Libras</option>
                            <option value="gramos">Gramos</option>
                            <option value="onzas">Onzas</option>
                            <option value="miligramos">Miligramos</option>
                        </optgroup>
                        <optgroup label="Volumen">
                            <option value="litros">Litros</option>
                            <option value="mililitros">Mililitros</option>
                        </optgroup>
                        <optgroup label="Cantidad">
                            <option value="unidades">Unidades</option>
                        </optgroup>
                        <optgroup label="Cucharas y Tazas">
                            <option value="cucharada">Cucharadas</option>
                            <option value="cucharadita">Cucharaditas</option>
                            <option value="tazas">Tazas</option>
                        </optgroup>
                        <optgroup label="Otras">
                            <option value="otros">Otros</option>
                        </optgroup>
                    </select>
                    <input type="number" id="price" name="price" placeholder="Precio" className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" min="0" required/>
                    <button className="bg-lime-500 p-2 rounded-md text-white hover:bg-lime-600 transition-colors">
                        <Check/>
                    </button>
                </div>             
            </div>

            {/*lista de productos*/}
            <ul className="mb-4 w-full flex flex-col bg-white border-b-2 px-3 py-3 rounded-md">
                <li className="flex items-center border-b-2 py-2 group">
                    <p className="w-full font-bold">Productos</p>
                    <div className="hidden md:flex item-center justify-between md:gap-10 md:mr-20 xl:mr-[90px]">
                        <span className="font-bold">Cantidad</span>
                        <span className="font-bold">Precio</span>
                    </div>
                </li>
                <li className="flex border-b-2 py-2 group">
                    <p className="w-full font-medium">Carne</p>
                    <div className="flex items-center justify-between gap-4 md:gap-10">
                        <p className="whitespace-nowrap">2 gramos</p>
                        <p className="">$3.50</p>
                        <div className=" w-11 md:w-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <EditIcon/>
                            <TrashIcon/>
                        </div>
                    </div>
                </li>             
            </ul>

            {/*sumatoria, total*/}
            <div className="mt-3 flex flex-col items-end w-full gap-1 md:text-lg">
                <div className="flex justify-start gap-4">
                    <span>SubTotal:</span>
                    <span>$5</span>
                </div>
                <div className="flex justify-start gap-4 border-b-2 border-black pb-1">
                    <label htmlFor="porcentaje">Porcentaje de Ganancia:</label>
                    <input type="number" id="porcentaje" name="porcentaje" inputMode="numeric" pattern="[0-9]*" className="w-8" placeholder="%" min="0" required/>
                </div>
                <div className="flex justify-start gap-4 font-bold">
                    <span>Total:</span>
                    <span>$5</span>
                </div>
            </div>

            {/*Boton*/}
            <div className="flex justify-end">
                <ButtomInput value="Guardar"/>
            </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
