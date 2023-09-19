import { Link} from "react-router-dom";
import Alert from "../components/Alert";
import axiosCustomer from "../config/axios";
import ButtomInput from "../components/ButtomInput";
import TextPublic from "../components/TextPublic";
import PasswordInput from "../components/PasswordInput";
import useValidation from "../hooks/useValidation";
import useNewPassword from "../hooks/useNewPassword";
import { useState} from "react";

const NewPassword = () => {
  const {token, alertH} = useNewPassword()
  const {formData, handleChange, validatePassword, setAlert, alert} = useValidation()
  const {password} = formData
  const [modifiedPassword, setModifiedPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if(!validatePassword()) return

    try {
      const url = `/vendedor/lost-password/${token}`;
      const { data } = await axiosCustomer.post(url, { password });
      setAlert({
        msg: data.msg,
      });
      setModifiedPassword(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  return (
    <>
      <TextPublic text="Reestablece tu password y no pierdas Acceso a tus Canastas" />

      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {(alert.msg || alertH.msg) && <Alert alert={alert.msg ? alert : alertH} />}

        {(!alert.error && !alertH.error || alert.mod) && (
          <form onSubmit={handleSubmit}>
            <PasswordInput value={formData.password} setPassword={handleChange}/>
            <ButtomInput value="Reestablecer Contraseña" />
          </form>
        )}
        {modifiedPassword && (
          <Link className="block text-center my-5 text-gray-600 text-lg font-medium" to={"/auth"}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NewPassword;
