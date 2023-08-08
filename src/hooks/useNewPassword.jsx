import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosCustomer from "../config/axios";

const useNewPassword = () =>{
    const [alertH, setAlertH] = useState({})
    const params = useParams();
    const {token} = params
  
    useEffect(() => {
      const checkToken = async () => {
        try {
          await axiosCustomer(`/vendedor/lost-password/${token}`);
          setAlertH({
            msg: "Coloca tu Nueva Contraseña",
          });
        } catch (error) {
          setAlertH({ msg: "Hubo un error con el enlace", error: true });
        }
      };
      checkToken();
    }, []);
  
    return {token, alertH}
  }
export default useNewPassword
