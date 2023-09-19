import { useState } from "react";
import alertToast from "../utilities/alertToast";

const useValidation = () =>{
    const [alert, setAlert] = useState({})
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    })
  
    function handleChange(e) {
      const {name, value} = e.target;
      setFormData(prevState => ({
        ...prevState, [name]: value
      }))
    }
    
    function validateName() {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s'_-]+$/

      if(!nameRegex.test(formData.name)){
        return alertToast({type:"error", msg:"Nombre inválido. No debe contener caracteres especiales." })
      }
      return true
    }

    function validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]*[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*[a-zA-Z][a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/;

      if(!emailRegex.test(formData.email)){
        return alertToast({type:"error", msg:"Correo no valido." })
      }
      return true
    }

    function validatePassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+\\/.-])[A-Za-z\d@$!%*?&+\\/.-]{8,}$/;
      if (!passwordRegex.test(password ? password : formData.password)) {
        return alertToast({type:"error", msg:`La contraseña debe cumplir con los siguientes requisitos:\n
        • Minimo 8 Caracteres
        • Una mayúscula
        • Un número
        • Al menos un carácter especial (@ $ ! % * ? & + - /)` })
      }
      return true
    }
  
    return{formData,handleChange, validateName, validateEmail, validatePassword, alert, setAlert}
  }
export default useValidation