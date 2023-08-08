import ReCAPTCHA from "react-google-recaptcha";
import RegisLoginLinks from "../components/RegisLoginLinks";
import Alert from "../components/Alert";
import axiosCustomer from "../config/axios";
import ButtomInput from "../components/ButtomInput";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import TextPublic from "../components/TextPublic";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth()
  const {handleChange, formData, alert, setAlert, validateEmail, validatePassword} = useValidation();
  const { email, password } = formData;
  const [sendEmail, setSendEmail] = useState("");
  const [sendConfirmed, setSendConfirmed] = useState("");
  const [isPasswordValid, setPasswordValid] = useState("");
  const captchaRef = useRef(null)

 
  async function handleSubmit(e) {
    e.preventDefault();  
    if(alert){
      setTimeout(() => {
        setAlert({});
      }, 3500);
    }
    
    if ([email.trim(), password.trim()].includes("")) {
      setAlert({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (!validateEmail()) return;
    if (!validatePassword()) {
      return setAlert({ msg: "Password no valido", error: true });
    }

    if (password === isPasswordValid && email === sendEmail) {
      return setAlert({ msg: "Password o Correo incorrecto", error: true });
    }

    if (sendConfirmed === false && email === sendEmail) {
      return setAlert({ msg: "Tu cuenta no ha sido confirmada, revisa tu email", error: true });
    }

    if (email === sendEmail && sendConfirmed === undefined && isPasswordValid === undefined) {
      return setAlert({ msg: "el usuario no existe", error: true });
    }

    if (!captchaRef.current.getValue()) {
      return setAlert({ msg: "Todos los campos son obligatorios",error: true});
    }

    try {
      const { data } = await axiosCustomer.post("/vendedor/login", {
        email,
        password,
        captcha: captchaRef.current.getValue(),
      });
      setPasswordValid("");
      localStorage.setItem("token", data.token);
      setAuth(data)
      navigate("/admin");
    } catch (error) {
      setSendEmail(error.response.data.emailR);
      setSendConfirmed(error.response.data.confirmed);
      setPasswordValid(error.response.data.valid);
      setAlert({ msg: error.response.data.msg, error: true });
      captchaRef.current.reset();
    }
  }

  return (
    <>
      <TextPublic text="Inicia Sesión y administra tus productos" />

      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert.msg && <Alert alert={alert} />}
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
