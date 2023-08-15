import { useState, useEffect, createContext } from "react";
import axiosCustomer from "../config/axios";

const CestinoContext = createContext();
export const CestinoProvider = ({ children }) => {
  const [save, setSave] = useState(false);
  const [cestini, setCestini] = useState([]);

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
  return (
    <CestinoContext.Provider value={{ cestini, saveCestino, save, setSave }}>
      {children}
    </CestinoContext.Provider>
  );
};

export default CestinoContext;
