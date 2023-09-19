import { useState, useEffect, createContext, useRef } from "react";
import { cestinoFormData } from "../helpers/cestinoFormData";
import { handleFailure } from "../helpers/handleFailure";
import { newCestino } from "../services/newCestino";
import { updatedCestino } from "../services/updatedCestino";
import { getApiCestino } from "../services/getApiCestino";
import { deletedApiCestino } from "../services/deletedApiCestino";

import useAuth from "../hooks/useAuth";
import alertToast from "../utilities/alertToast";

const CestinoContext = createContext();
export const CestinoProvider = ({ children }) => {
  const { auth } = useAuth()
  const [cestini, setCestini] = useState([]);
  const [cestino, setCestino] = useState({})
  const [productEdit, setProductEdit] = useState({});    
  const [products, setProducts] = useState([]);    
  const [editMode, setEditMode]= useState(false)
  const [loading, setLoading]= useState(false)
  const nameBack = useRef("")
  
  useEffect(() => {
   async function getCestino() {
      try {
        const data = await getApiCestino()
        if(data){
          setCestini(data)
        }
      } catch (error) {
        alertToast({type:"error", msg:error.response.data.msg})
      }
    }
    getCestino()
  }, [auth]);

  async function saveCestino(cestino) {
    setLoading(true)
    const formData = await cestinoFormData(cestino)
  
    try {
      if(cestino.id || cestino._id){
        const data = await updatedCestino({cestino, formData})
        const upCestino = cestini.map(cestinoState => cestinoState._id === data._id ? data : cestinoState)
        setCestini(upCestino)
        alertToast({type: "success", msg: "Modificado Correctamente"})
      }else{
        const cestinoStored = await newCestino({formData})
        setCestini([cestinoStored,...cestini])
        alertToast({type: "success", msg: "Agregado correctamente"})
      }

      nameBack.current = ""
      return{ error:false }
    } catch (error) {
      handleFailure({nameBack,error})
      return{ error: true }
    }finally{
      setLoading(false)
    }
  }

  async function setEdit(cestino) {
    setCestino(cestino)
  }
  
  async function deletedCestino(id) {
    const confirmar = confirm("SEGURO QUE DESEAS ELIMINAR ESTA CANASTA")

    if(confirmar){
      try {
        const data = await deletedApiCestino({id})
        const updatedCestino = cestini.filter(cestinoState => cestinoState._id  !== id)
        setCestini(updatedCestino)
        alertToast({type: "success", msg: data.msg})
      } catch (error) {
        alertToast({type: "error", msg: error.response.data.msg})
      }
    }
  }
  
  return (
    <CestinoContext.Provider value={{ cestini, saveCestino, setEdit, cestino, editMode, setEditMode, products, setProducts, productEdit,setProductEdit, deletedCestino, nameBack, loading }}>
      {children}
    </CestinoContext.Provider>
  );
};

export default CestinoContext;