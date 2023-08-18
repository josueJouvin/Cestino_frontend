import { useState, useEffect, createContext } from "react";
import axiosCustomer from "../config/axios";

const CestinoContext = createContext();
export const CestinoProvider = ({ children }) => {
  const [save, setSave] = useState(false);
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
  }, []);

  async function saveCestino(cestino) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosCustomer.post("/producto", cestino, config);
      const { createdAt, updatedAt, __v, ...cestinoStored } = data;
      setCestini([cestinoStored, ...cestini]);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  const setEdit = (cestino) =>{
    setCestino(cestino)
  }
  return (
    <CestinoContext.Provider value={{ cestini, saveCestino, save, setSave, setEdit, cestino, editMode, setEditMode, products, setProducts, productEdit,setProductEdit }}>
      {children}
    </CestinoContext.Provider>
  );
};

export default CestinoContext;
