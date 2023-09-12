import { useState, useEffect } from "react";
import { Check, Close} from "./Icons";
import { generateId } from "../helpers/generateId";

import alertToast from "../utilities/alertToast";
import ButtomInput from "./ButtomInput";
import useProductCalculations from "../hooks/useProductCalculations";
import useCestino from "../hooks/useCestino";
import useImageUpload from "../hooks/useImageUpload";
import Modal from "./Modal";
import ProductsForm from "./ProductsForm";
import useKeyboard from "../hooks/useKeyboard";

const Form = ({changeShow}) => {
    const { percentage, profit, subTotal, total, setPercentage } = useProductCalculations()
    const { saveCestino, cestino, editMode, setEditMode, products, setProducts, setProductEdit, nameBack } = useCestino()
    const { image, setImage, setPreImage, preImage, handleImageUpload, deletedImage } = useImageUpload()
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
            setImage(cestino.image?.secure_url)
            setPreImage(cestino.image?.secure_url)
            setName(cestino.name)
            setProducts(cestino.products)
            setPercentage(cestino.percentage)
            setId(cestino._id)
        }
    },[cestino])

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
        if(name === nameBack.current){
            alertToast({tipe: "error", msg: "Esta Canasta ya Existe"})
            return
        }
        if(!products.length && Array.isArray(products)){
            alertToast({tipe: "warning", msg: "Se requiere al menos 1 producto."})
            return
        }
        const whitOutId = products.map(({ id, ...prod }) => prod)
        const results = await saveCestino({name, products: whitOutId, subTotal, percentage, profit, total, id, image})
        if(!results.error){
            setProducts([])
            setProductEdit({})
            setName("")
            setEditMode(false)
            changeShow()           
        }
    }

    function closeForm() {
        setProducts([])
        setProductEdit({})
        setName("")
        setEditMode(false)
        changeShow()  
    }

    useKeyboard(closeForm, handleSubmit)

  return (
    <Modal>
        <form onSubmit={handleSubmit} noValidate className="bg-slate-200 dark:bg-zinc-900 md:w-3/4 xl:w-3/5 2xl:w-1/2 p-7 mx-auto rounded-xl z-[1000]">
            <section className="flex justify-between items-center mb-4">
                <span className="font-bold text-2xl text-lime-600 dark:text-lime-600">CESTINO</span>
                <button onClick={closeForm}>
                    <Close />
                </button>
            </section>

            <section className="flex flex-col md:flex-row justify-center items-center gap-8 mb-4 dark:text-slate-300 text-gray-800 font-bold">
                <img className="w-32 h-32 shadow-md rounded-full object-cover relative" alt="Imagen canasta" src={preImage ? preImage : image}/>
                <div className="flex flex-col gap-2">
                    <label htmlFor="image" className="inline-block mb-2">Imagen de Canasta</label>
                    <div className="flex gap-4">
                        <input type="file" id="image" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500" accept="image/*" onChange={handleImageUpload}/>
                        {image || preImage ? <button onClick={deletedImage}><Close/></button> : null}
                    </div>
               </div>
            </section>

            { /*input de canasta*/}
            <div className="mb-4">
                <label htmlFor="name" className="inline-block mb-2 dark:text-slate-300 text-gray-800 font-bold">Nombre de Canasta</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600" placeholder="Canasta de Víveres, Torta de Chocolate, ..." value={name} onChange={e => setName(e.target.value)} required/>
            </div>

            {/*input de productos*/}
            <section className="mb-4 ">
                <label htmlFor="nameproduct" className="inline-block text-gray-800 font-bold mb-2 dark:text-slate-300">Producto</label>
                <div className="flex gap-3 items-center flex-wrap md:flex-nowrap">
                    <input type="text" id="nameproduct" name="nameproduct" className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600" placeholder="Carne, Aceite, Chocolate, Manzana, ..." value={formProducts.nameproduct} onChange={handleChangeProducts} required/>
                    <input type="number" id="quantity" name="quantity" placeholder="Cantidad" className="w-28 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600" min="1" value={formProducts.quantity} onChange={handleChangeProducts} required/>
                    <select onChange={handleChangeProducts} value={formProducts.unitmeasure} id="unitmeasure" name="unitmeasure" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300">
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
                    <input type="number" id="price" name="price" placeholder="Precio" className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-lime-500 dark:bg-slate-200 dark:focus:border-slate-300 dark:placeholder:text-gray-600" min="0" value={formProducts.price} onChange={handleChangeProducts} required/>
                    <button type="button" onClick={addProduct} className="bg-lime-500 p-2 rounded-md text-white hover:bg-lime-600 transition-colors">
                        <Check/>
                    </button>
                </div>             
            </section>

            {/*lista de productos*/}  
            <ProductsForm setFormProducts={setFormProducts}/>        

            {/*sumatoria, total*/}
            <section className="mt-3 flex flex-col items-end w-full gap-1 md:text-lg">
                <div className="flex justify-start gap-4 dark:text-slate-300">
                    <span>SubTotal:</span>
                    <span>$ {subTotal}</span>
                </div>
                <div className="flex justify-start gap-4 border-b-2 border-black pb-1">
                    <label className="dark:text-slate-300" htmlFor="porcentaje">Porcentaje de Ganancia:</label>
                    <input type="number" id="porcentaje" name="porcentaje" className="w-12 dark:placeholder:text-gray-600" placeholder="%" min="0" value={percentage || ""} onChange={e => setPercentage(e.target.value)}/>
                </div>
                <div className="flex justify-start gap-4 dark:text-slate-300 ">
                    <span>Ganancia de canasta:</span>
                    <span>$ {percentage ? Number(profit).toFixed(2) : 0}</span>
                </div>
                <div className="flex justify-start gap-4 font-bold dark:text-slate-300">
                    <span>Total:</span>
                    <span>${total ? Number(total).toFixed(2) : 0}</span>
                </div>
            </section>
            
            {/*Boton*/}
            <div className="flex justify-end">
                <ButtomInput value={id ? "Guardar Edicion" : "Agregar Canasta"} handleSubmit={handleSubmit}/>
            </div>
        </form>
    </Modal>
  );
};

export default Form;