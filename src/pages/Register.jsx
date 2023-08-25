import ReCAPTCHA from "react-google-recaptcha";
import EmailInput from "../components/EmailInput";
import ButtomInput from "../components/ButtomInput";
import Alert from "../components/Alert";
import axiosCustomer from "../config/axios";
import RegisLoginLinks from "../components/RegisLoginLinks";
import PasswordInput from "../components/PasswordInput";
import TextPublic from "../components/TextPublic";
import useValidation from "../hooks/useValidation";
import { useRef } from "react";

const Register = () => {
  const {formData, handleChange, alert, setAlert, validateEmail, validateName,validatePassword} = useValidation()
  const {name, email, password, repeatPassword} = formData
  const sendEmailRef = useRef(null)
  const captchaRef = useRef(null);

  async function handleSubmit(e){
    e.preventDefault() 

    if([name.trim(),email.trim(),password.trim(),repeatPassword.trim()].includes("")){
      setAlert({msg: "existen campos vacios", error: true})
      return
    }

    if(!validateName() || !validateEmail() || !validatePassword()) return
    
    if(password !== repeatPassword){
      setAlert({msg: "Los Password no son iguales", error: true})
      return
    }
    
    if(email === sendEmailRef.current){
      setAlert({ msg: "Usuario ya registrado", error: true });  
      return;
    }

    if(!captchaRef.current.getValue()){
      setAlert({ msg: "Todos los campos son obligatorios", error: true });
      setTimeout(() => {
        setAlert({});
      }, 3500);
      return;
    }

    try {
      await axiosCustomer.post("/vendedor",{name, email, password, repeatPassword, captcha: captchaRef.current.getValue()})
      setAlert({msg: "Creado correctamente, Revisa tu email", error: false})
      sendEmailRef.current = email
    } catch (error) {
      sendEmailRef.current = error.response.data.emailR
      setAlert({msg: error.response.data.msg, error: true})
      captchaRef.current.reset();
    }
  }

  return (
    <>
      <TextPublic text="Crea tu cuenta y administra tus productos"/>
      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert.msg && <Alert alert={alert}/>}
        
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