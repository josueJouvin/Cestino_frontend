import ReCAPTCHA from "react-google-recaptcha";
import EmailInput from "../components/EmailInput";
import ButtomInput from "../components/ButtomInput";
import axiosCustomer from "../config/axios";
import RegisLoginLinks from "../components/RegisLoginLinks";
import PasswordInput from "../components/PasswordInput";
import TextPublic from "../components/TextPublic";
import useValidation from "../hooks/useValidation";
import alertToast from "../utilities/alertToast";
import { useRef } from "react";

const Register = () => {
  const {formData, handleChange, validateEmail, validateName,validatePassword} = useValidation()
  const {name, email, password, repeatPassword} = formData
  const sendEmailRef = useRef(null)
  const captchaRef = useRef(null);

  async function handleSubmit(e){
    e.preventDefault() 

    if([name.trim(),email.trim(),password.trim(),repeatPassword.trim()].includes("")){
      return alertToast({type:"error", msg:"Todos los campos son obligatorios." })
    }

    if(!validateName() || !validateEmail() || !validatePassword()) return
    
    if(password !== repeatPassword){
      return alertToast({type:"error", msg:"Los Password no son iguales."})
    }
    
    if(email === sendEmailRef.current){
      return alertToast({type:"error", msg:"Usuario ya registrado."})
    }

    if(!captchaRef.current.getValue()){
      return alertToast({type:"error", msg:"Todos los campos son obligatorios." })
    }

    try {
      await axiosCustomer.post("/vendedor",{name, email, password, repeatPassword, captcha: captchaRef.current.getValue()})
      alertToast({type:"success", msg:"Creado correctamente, Revisa tu email."})
      sendEmailRef.current = email
    } catch (error) {
      sendEmailRef.current = error.response.data.emailR
      alertToast({type:"error", msg:error.response.data.msg})
      captchaRef.current.reset();
    }
  }

  return (
    <>
      <TextPublic text="Crea tu cuenta y administra tus Canastas"/>
      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="my-5">
            <label htmlFor="name" className="uppercase text-gray-700 block text-xl font-bold">
              Nombre
            </label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Cestino"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <EmailInput setEmail={handleChange} value={formData.email}/>
          <PasswordInput setPassword={handleChange} value={formData.password}/>
          
          <div className="my-5">
            <label htmlFor="repeatPassword" className="uppercase text-gray-700 block text-xl font-bold">
              Repetir Contraseña
            </label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500" value={formData.repeatPassword}
              onChange={handleChange}/>
          </div>

          <ReCAPTCHA
            ref={captchaRef}
            sitekey= {import.meta.env.VITE_CAPTCHA_KEY}
          />

          <ButtomInput value="Crear Cuenta"/>
        </form>
        
        <RegisLoginLinks urlLinkF="" textLinkF={"Inicia sesión"}/>
      </div>
    </>
  );
};

export default Register;