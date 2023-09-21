import ReCAPTCHA from "react-google-recaptcha";
import RegisLoginLinks from "../components/RegisLoginLinks";
import axiosCustomer from "../config/axios";
import ButtomInput from "../components/ButtomInput";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import TextPublic from "../components/TextPublic";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth";
import alertToast from "../utilities/alertToast";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { validFields } from "../utilities/validFields";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth()
  const {handleChange, formData, validateEmail, validatePassword} = useValidation();
  const { email, password } = formData;
  const [sendEmail, setSendEmail] = useState("");
  const [sendConfirmed, setSendConfirmed] = useState("");
  const [isPasswordValid, setPasswordValid] = useState("");
  const captchaRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault();  

    const requiredFields = [email, password]
    if(!validFields(requiredFields))

    if (!validateEmail()) return;
    if (!validatePassword()) { 
      return alertToast({type:"error" ,msg: "Password no valido"});
    }

    if (password === isPasswordValid && email === sendEmail) {
      return alertToast({type:"error" ,msg: "Password o Correo incorrecto"});
    }

    if (sendConfirmed === false && email === sendEmail) {
      return alertToast({type:"warning" ,msg: "Tu cuenta no ha sido confirmada, revisa tu email."});
    }

    if (email === sendEmail && sendConfirmed === undefined && isPasswordValid === undefined) {
      return alertToast({type:"error" ,msg: "El usuario no existe"});
    }

    if (!captchaRef.current.getValue()) {
      return alertToast({type:"error" ,msg: "Todos los campos son obligatorios"});
    }

    try {
      const { data } = await axiosCustomer.post("/vendedor/login", {
        email, password, captcha: captchaRef.current.getValue(),
      });
      setPasswordValid("");
      localStorage.setItem("token", data.token);
      setAuth(data)
      navigate("/admin");
    } catch (error) {
      setSendEmail(error.response.data.emailR);
      setSendConfirmed(error.response.data.confirmed);
      setPasswordValid(error.response.data.valid);
      alertToast({type:"error" ,msg: error.response.data.msg});
      captchaRef.current.reset();
    }
  }

  return (
    <>
      <TextPublic text="Inicia Sesión y administra tus Canastas" />
      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit} noValidate>
          <EmailInput setEmail={handleChange} value={email} />
          <PasswordInput setPassword={handleChange} value={password} />
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={import.meta.env.VITE_CAPTCHA_KEY}
          />
          <ButtomInput value="Iniciar Sesión" />
        </form>
        <RegisLoginLinks urlLinkF={"registrar"} />
      </div>
    </>
  );
}
