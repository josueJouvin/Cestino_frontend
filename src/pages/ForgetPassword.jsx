import RegisLoginLinks from "../components/RegisLoginLinks";
import Alert from "../components/Alert";
import axiosCustomer from "../config/axios";
import ButtomInput from "../components/ButtomInput";
import EmailInput from "../components/EmailInput";
import TextPublic from "../components/TextPublic";
import useValidation from "../hooks/useValidation";
import { useRef } from "react";

const ForgetPassword = () => {
  const { handleChange, formData, alert, setAlert, validateEmail } = useValidation();
  const { email } = formData;
  const sendEmailRef = useRef(null);
  const confirmedRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      setAlert({});
    }, 3500);

    if (email.trim() === "") {
      setAlert({ msg: "El email es obligatorio", error: true });
      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    if (!validateEmail()) return;

    if (confirmedRef.current === undefined && email === sendEmailRef.current) {
      setAlert({ msg: "el usuario no existe", error: true });
      return;
    }

    if (confirmedRef.current === false && email === sendEmailRef.current) {
      setAlert({
        msg: "Su cuenta aun no ha sido confirmada. Revise su correo",
        error: true,
      });
      return;
    }

    if (confirmedRef.current === true && email === sendEmailRef.current) {
      setAlert({
        msg: "Ya se ha enviado un correo de recuperación. Por favor, revise su correo.",
        error: true
      });
      return;
    }

    try {
      const { data } = await axiosCustomer.post("/vendedor/lost-password", {email});
      setAlert({ msg: data.msg });
    } catch (error) {
      sendEmailRef.current = error.response.data.emailR;
      confirmedRef.current = error.response.data.confirmed;
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <TextPublic text="Recupera tu Acceso y no Pierdas tus Canastas" />

      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert.msg && <Alert alert={alert} />}

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
