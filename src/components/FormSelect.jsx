import { generateId } from "../helpers/generateId";
import useCestino from "../hooks/useCestino";
import alertToast from "../utilities/alertToast";
import { Check } from "./Icons";

const FormSelect = ({formProducts, handleChangeProducts}) => {
    const { products, setProducts} = useCestino()

    function addProduct(e){
        e.preventDefault()
        const {nameproduct, price, quantity, unitmeasure} = formProducts

        if([nameproduct.trim(),price,quantity,unitmeasure].includes("")){
            alertToast({tipe: "error", msg: "El producto no debe tener campos vacios"})
            return
        }
        
        if(formProducts.id){
            const edit = products.map(prod => prod.id === formProducts.id || prod._id === formProducts.id ? formProducts : prod )
            setProducts(edit) 
        }else{
            const newProduct={
                ...formProducts,
                id: generateId()
            }
            setProducts(prevProducts => [...prevProducts, newProduct]);       
        }   
    }

  return (
    <section className="mb-4 ">
      <label
        htmlFor="nameproduct"
        className="inline-block text-gray-800 font-bold mb-2 dark:text-slate-300"
      >
        Producto
      </label>
      <div className="flex gap-3 items-center flex-wrap md:flex-nowrap">
        <input
          type="text"
          id="nameproduct"
          name="nameproduct"
          className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600"
          placeholder="Carne, Aceite, Chocolate, Manzana, ..."
          value={formProducts.nameproduct}
          onChange={handleChangeProducts}
          required
        />
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Cantidad"
          className="w-28 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600"
          min="1"
          value={formProducts.quantity}
          onChange={handleChangeProducts}
          required
        />
        <select
          onChange={handleChangeProducts}
          value={formProducts.unitmeasure}
          id="unitmeasure"
          name="unitmeasure"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300"
        >
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
            <option value="cucharadas">Cucharadas</option>
            <option value="cucharaditas">Cucharaditas</option>
            <option value="tazas">Tazas</option>
          </optgroup>
          <optgroup label="Otras">
            <option value="otros">Otros</option>
          </optgroup>
        </select>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Precio"
          className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600"
          min="0"
          value={formProducts.price}
          onChange={handleChangeProducts}
          required
        />
        <button
          type="button"
          onClick={addProduct}
          className="bg-lime-500 p-2 rounded-md text-white hover:bg-lime-600 transition-colors"
        >
          <Check />
        </button>
      </div>
    </section>
  );
};

export default FormSelect;
