import { useState } from "react";
import ButtomInput from "./ButtomInput";
import { Check, Close} from "./Icons";
import ListProducts from "./ListProducts";
import { useEffect } from "react";
import useValidation from "../hooks/useValidation";
import Alert from "./Alert";
import { generateId } from "../helpers/generateId";

const Form = ({changeShow}) => {
    const { alert, setAlert } = useValidation()
    const [subTotal, setSubtotal] = useState()
    const [total, setTotal] = useState()
    const [percentage, setPercentage] = useState()
    const [profit, setProfit] = useState()
    const [products, setProducts] = useState([])

    const [formProducts, setFormProducts] = useState({
        nameproduct: "",
        quantity: "",
        unitmeasure: "",
        price: "",
    })
    const [formData, setFormData] = useState({
        name: "",
        subTotal: "",
        profit: "",
        total: "",
    })

    if(alert.error){
        setTimeout(() => {
          setAlert({});
        }, 3500);
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(prevState => ({
          ...prevState, [name]: value
        }))
    }
    const handleChangeProducts = e => {
        const {name, value} = e.target;
        setFormProducts(prevState => ({
            ...prevState, [name]: value
        }))
    }
    const addProduct = () =>{
        const {nameproduct, price, quantity, unitmeasure} = formProducts
        if([nameproduct.trim(), price.trim(), quantity.trim(), unitmeasure.trim()].includes("")){
            setAlert({ msg: "existen campos vacios en el producto", error: true });
            return
        }
        const newProduct={
            ...formProducts,
            id: generateId()
        }
        setProducts(prevProducts => [...prevProducts, newProduct]);
        setFormProducts({
            nameproduct: "",
            quantity: "",
            unitmeasure: "",
            price: ""
        });
    }


    useEffect(() => {
        const calculateSubtotal = () =>{
            const subTotal = products.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)
            setSubtotal(subTotal)
        }
    calculateSubtotal()
    },[products])

    useEffect(() => {
        const calculatePorcentaje = () =>{
            const calc = (subTotal * percentage)/100
            setProfit(calc)
        }
        calculatePorcentaje()
    },[percentage, subTotal])

    useEffect(() => {
        const calculateTotal = () =>{
            const calc = percentage ? subTotal + profit : subTotal
            setTotal(calc)
        }
        calculateTotal()
    },[percentage, subTotal, profit])

  return (
    <section className="absolute inset-0">
      <div className="inset-0 fixed grid place-items-center bg-gray-800/80 overflow-y-auto z-50">
        <form className="bg-slate-200 md:w-3/4 xl:w-3/5 2xl:w-1/2 p-7 mx-auto rounded-xl">

            <section className="flex justify-between items-center mb-4">
                <span className="font-bold text-2xl text-lime-600">CESTINO</span>
                <button onClick={changeShow}>
                    <Close />
                </button>
            </section>

            <div className="mb-4">
                <label htmlFor="image" className="inline-block text-gray-800 font-bold mb-2">Imagen</label>
                <input type="file" id="image" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500"/>
            </div>

            { /*input de canasta*/}
            <div className="mb-4">
                <label htmlFor="name" className="inline-block text-gray-800 font-bold mb-2">Nombre de Canasta</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" placeholder="Canasta de Víveres, Torta de Chocolate, ..." value={formData.name} onChange={handleChange} required/>
            </div>

            {/*input de productos*/}
            <div className="mb-4">
                    { alert.msg && <Alert alert={alert}/>}
                    <label htmlFor="nameproduct" className="inline-block text-gray-800 font-bold mb-2">Producto</label>
                    <div className="flex gap-3 items-center flex-wrap md:flex-nowrap">
                        <input type="text" id="nameproduct" name="nameproduct" className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" placeholder="Carne, Aceite, Chocolate, Manzana, ..." value={formProducts.nameproduct} onChange={handleChangeProducts} required/>
                        <input type="number" id="quantity" name="quantity" placeholder="Cantidad" className="w-28 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-lime-500" min="1" value={formProducts.quantity} onChange={handleChangeProducts} required/>
                        <select onChange={handleChangeProducts} value={formProducts.unitmeasure} id="unitmeasure" name="unitmeasure" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500">
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
                        <input type="number" id="price" name="price" placeholder="Precio" className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" min="0" value={formProducts.price} onChange={handleChangeProducts} required/>
                        <button type="button" onClick={addProduct} className="bg-lime-500 p-2 rounded-md text-white hover:bg-lime-600 transition-colors">
                            <Check/>
                        </button>
                    </div>             
            </div>

            {/*lista de productos*/}          
            {products.length ?  
                <ul className="mb-4 w-full flex flex-col bg-white border-b-2 px-3 py-3 rounded-md">
                    <li className="flex items-center border-b-2 py-2 group">
                        <p className="w-full font-bold">Productos</p>
                        <div className="flex item-center justify-between gap-6 lg:gap-8 mr-14 md:mr-[65px]">
                            <span className="font-bold">Cantidad</span>
                            <span className="font-bold">Precio</span>
                        </div>
                    </li>
                    {products.map(product => (
                     <ListProducts key={product.id} product={product} products={products} setProducts={setProducts}/>
                    ))}
                </ul> : "Aun no tienes productos ingresados"}
            
            {/*sumatoria, total*/}
            <section className="mt-3 flex flex-col items-end w-full gap-1 md:text-lg">
                <div className="flex justify-start gap-4">
                    <span>SubTotal:</span>
                    <span>$ {subTotal}</span>
                </div>
                <div className="flex justify-start gap-4 border-b-2 border-black pb-1">
                    <label htmlFor="porcentaje">Porcentaje de Ganancia:</label>
                    <input type="number" id="porcentaje" name="porcentaje" className="w-12" placeholder="%" min="0" value={percentage} onChange={e => setPercentage(e.target.value)}/>
                </div>
                <div className="flex justify-start gap-4">
                    <span>Ganancia de canasta:</span>
                    <span>$ {percentage ? Number(profit).toFixed(2) : 0}</span>
                </div>
                <div className="flex justify-start gap-4 font-bold">
                    <span>Total:</span>
                    <span>${total ? Number(total).toFixed(2) : 0}</span>
                </div>
            </section>

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
