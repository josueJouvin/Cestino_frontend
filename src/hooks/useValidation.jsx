import { useState } from "react";

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
        return setAlert({msg: "Nombre inválido. No debe contener caracteres especiales.", error: true})
      }
      return true
    }

    function validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]*[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*[a-zA-Z][a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/;

      if(!emailRegex.test(formData.email)){
        return setAlert({msg: "Correo no valido", error:true})
      }
      return true
    }

    function validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+\\/.-])[A-Za-z\d@$!%*?&+\\/.-]{8,}$/;
      if (!passwordRegex.test(formData.password)) {

        return setAlert({ msg: `La contraseña debe cumplir con los siguientes requisitos:\n
        • Minimo 8 Caracteres
        • Al menos una letra mayúscula
        • Al menos un número
        • Al menos un carácter especial (@ $ ! % * ? & + - /)`, 
        error: true, mod: true});
      }
      return true
    }
  
    return{formData,handleChange, validateName, validateEmail, validatePassword, alert, setAlert}
  }
export default useValidation