import { useState, useEffect, createContext } from "react";
import axiosCustomer from "../config/axios";
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

  useEffect(() => {
   async function getCestino() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const {data} = await axiosCustomer("/producto", config)
        setCestini(data)
      } catch (error) {
        console.log(error);
      }
    }
    getCestino()
  }, [auth, cestini.length]);

  async function saveCestino(cestino) {
    const token = localStorage.getItem("token");
    const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

    if(cestino.id || cestino._id){
      try {
        const { data } = await axiosCustomer.put(`/producto/${cestino.id}`,cestino,config)
        const updatedCestino = cestini.map(cestinoState => cestinoState._id === data._id ? data : cestinoState)
        setCestini(updatedCestino)
        alertToast({tipe: "success", msg: "Modificado Correctamente"})
        return{
          error:false
        }
      } catch (error) {
        alertToast({tipe: "error", msg: error.response.data.msg})
        return{
          error: true
        }
      }
    }else{
      try {
        const { data } = await axiosCustomer.post("/producto", cestino, config);
        const { createdAt, updatedAt, __v, ...cestinoStored } = data;
        setCestini([cestinoStored, ...cestini]);
        alertToast({tipe: "success", msg: "Agregado correctamente"})
        return{
          error:false
        }
      } catch (error) {
        alertToast({tipe: "error", msg: error.response.data.msg})
        return{
          error: true
        }
      }
    }
  }

  async function setEdit(cestino) {
    setCestino(cestino)
  }
  
  async function deletedCestino(id) {
    const confirmar = confirm("SEGURO QUE DESEAS ELIMINAR ESTA CANASTA")

    if(confirmar){
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosCustomer.delete(`/producto/${id}`,config)
        const updatedCestino = cestini.filter(cestinoState => cestinoState._id !== id)
        setCestini(updatedCestino)
        alertToast({tipe: "success", msg: data.msg})
      } catch (error) {
        alertToast({tipe: "error", msg: error.response.data.msg})
      }
    }
  }
  
  return (
    <CestinoContext.Provider value={{ cestini, saveCestino, setEdit, cestino, editMode, setEditMode, products, setProducts, productEdit,setProductEdit, deletedCestino }}>
      {children}
    </CestinoContext.Provider>
  );
};

export default CestinoContext;