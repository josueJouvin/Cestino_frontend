import RegisLoginLinks from "../components/RegisLoginLinks";
import axiosCustomer from "../config/axios";
import ButtomInput from "../components/ButtomInput";
import EmailInput from "../components/EmailInput";
import TextPublic from "../components/TextPublic";
import useValidation from "../hooks/useValidation";
import alertToast from "../utilities/alertToast";
import { useRef } from "react";
import { validFields } from "../utilities/validFields";

const ForgetPassword = () => {
  const { handleChange, formData, validateEmail } = useValidation();
  const { email } = formData;
  const sendEmailRef = useRef(null);
  const confirmedRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validFields([email]) || !validateEmail()) return
 
    if (confirmedRef.current === undefined && email === sendEmailRef.current) {
      return alertToast({type:"error", msg: "El usuario no existe."})
    }

    if (confirmedRef.current === false && email === sendEmailRef.current) {
      return alertToast({type:"warning", msg: "Su cuenta aun no ha sido confirmada. Revise su correo."})
    }

    if (confirmedRef.current === true && email === sendEmailRef.current) {
      return alertToast({type:"error", msg: "Ya se ha enviado un correo de recuperación. Por favor, revise su correo."})
    }

    try {
      const { data } = await axiosCustomer.post("/vendedor/lost-password", {email});
      alertToast({type:"success",msg: data.msg})
    } catch (error) {
      sendEmailRef.current = error.response.data.emailR;
      confirmedRef.current = error.response.data.confirmed;
      alertToast({type:"error",msg: error.response.data.msg})
    }
  };

  return (
    <>
      <TextPublic text="Recupera tu Acceso y no Pierdas tus Canastas" />
      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit} noValidate>
          <EmailInput setEmail={handleChange} value={email} />
          <ButtomInput value="Recuperar Cuenta" />
        </form>

        <RegisLoginLinks
          urlLinkF="registrar"
          urlLinkS=""
          textLinkS="Iniciar Sessión"
        />
      </div>
    </>
  );
};

export default ForgetPassword;