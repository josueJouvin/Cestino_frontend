import { useState, useEffect } from "react";
import { Check, Close} from "./Icons";
import { generateId } from "../helpers/generateId";

import alertToast from "../utilities/alertToast";
import ButtomInput from "./ButtomInput";
import ListProducts from "./ListProducts";
import useProductCalculations from "../hooks/useProductCalculations";
import useCestino from "../hooks/useCestino";

const Form = ({changeShow}) => {
    const { percentage, profit, setPercentage, subTotal, total } = useProductCalculations()
    const { saveCestino, cestino, editMode, setEditMode, products, setProducts} = useCestino()
    const [name, setName] = useState("")
    const [id, setId] = useState(null)
    const [formProducts, setFormProducts] = useState({
        nameproduct: "",
        quantity: "",
        unitmeasure: "",
        price: ""
    })
    
    useEffect(()=>{
        if(cestino?.name && editMode){
            setName(cestino.name)
            setProducts(cestino.products)
            setPercentage(cestino.percentage)
            setId(cestino._id)
        }
    },[cestino, editMode])

    function handleChangeProducts(e){
        const {name, value} = e.target;
        setFormProducts({...formProducts, [name]: value})
    }   

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

    async function handleSubmit(e) {    
        e.preventDefault()
        if(name.trim() === ""){
            alertToast({tipe: "error", msg: "El nombre de la canasta no puede estar vació"})
            return
        }
        if(!products.length){
            alertToast({tipe: "warning", msg: "Se requiere al menos 1 producto."})
            return
        }

        const results = await saveCestino({name, products, subTotal, percentage, profit, total, id})
        if(!results.error){
            setProducts([])
            setName("")
            setEditMode(false)
            changeShow()           
        }
    }

    function closeForm() {
        setEditMode(false)
        setProducts([])
        changeShow()
    }

  return (
    <section className="absolute inset-0">
      <div className="inset-0 fixed grid place-items-center bg-gray-800/80 overflow-y-auto z-50">
        <form onSubmit={handleSubmit} noValidate className="bg-slate-200 md:w-3/4 xl:w-3/5 2xl:w-1/2 p-7 mx-auto rounded-xl">

            <section className="flex justify-between items-center mb-4">
                <span className="font-bold text-2xl text-lime-600">CESTINO</span>
                <button onClick={closeForm}>
                    <Close />
                </button>
            </section>

            <div className="mb-4">
                <label htmlFor="image" className="inline-block text-gray-800 font-bold mb-2">Imagen de Canasta</label>
                <input type="file" id="image" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500"/>
            </div>

            { /*input de canasta*/}
            <div className="mb-4">
                <label htmlFor="name" className="inline-block text-gray-800 font-bold mb-2">Nombre de Canasta</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" placeholder="Canasta de Víveres, Torta de Chocolate, ..." value={name} onChange={e => setName(e.target.value)} required/>
            </div>

            {/*input de productos*/}
            <section className="mb-4">
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
            </section>

            {/*lista de productos*/}          
            {products.length ?  
                <ul className="mb-4 w-full flex flex-col bg-white border-b-2 px-3 py-3 rounded-md">
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
                </ul> : <p className="text-center font-semibold my-2 text-lg">Aún no tienes productos ingresados</p>}
            
            {/*sumatoria, total*/}
            <section className="mt-3 flex flex-col items-end w-full gap-1 md:text-lg">
                <div className="flex justify-start gap-4">
                    <span>SubTotal:</span>
                    <span>$ {subTotal}</span>
                </div>
                <div className="flex justify-start gap-4 border-b-2 border-black pb-1">
                    <label htmlFor="porcentaje">Porcentaje de Ganancia:</label>
                    <input type="number" id="porcentaje" name="porcentaje" className="w-12" placeholder="%" min="0" value={percentage || ""} onChange={e => setPercentage(e.target.value)}/>
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
                <ButtomInput value={id ? "Guardar Edicion" : "Agregar Canasta"}/>
            </div>
        </form>
      </div>
    </section>
  );
};

export default Form;