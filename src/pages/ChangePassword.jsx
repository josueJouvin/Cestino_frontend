import { useState } from "react";
import ButtomInput from "../components/ButtomInput"
import { Link } from "react-router-dom";
import alertToast from "../utilities/alertToast";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth"
import PasswordInput from "../components/PasswordInput";

const ChangePassword = () => {
  const { savePassword } = useAuth()
  const { validatePassword} = useValidation()
  const [password, setPassword] = useState({
    pwd_current: "",
    pwd_new: ""
  })

  function handleChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if(Object.values(password).some(field => field === "")){
      alertToast({tipe: "error", msg: "Todos los campos son obligatorios"})
      return
    }
    
    if(!validatePassword(password.pwd_new)){
      alertToast({tipe: "error", msg: "La nueva contraseña debe tener minimo 8 caracteres, 1 numero, mayusculas y caracter especial. (@ $ ! % * ? & + - /)"})
      return
    }

    const response = await savePassword(password)
    if(response.error){
      alertToast({tipe: "error", msg: response.msg})
    }else{
      alertToast({tipe: "success", msg: response.msg})
    }
  }



  return (
    <section className=" flex flex-col gap-10 w-full px-5 md:px-0">
      <h2 className="font-black text-3xl text-lime-800 text-center mt-10 lg:mt-0">
        Cambiar Contraseña
      </h2>

      <section className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="pwd_current" className="uppercase font-bold text-gray-800 text-lg">
                Contraseña Actual
              </label>
              <input
                type="password" name="pwd_current" id="pwd_current" placeholder="Contr@señaActual99*"
                className="border bg-gray-100 w-full p-2 mt-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                onChange={handleChange}
              />
            </div> 
            
            <div className="my-3">
              <PasswordInput newP={password} setPassword={handleChange}/>
            </div> 
            <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
              <ButtomInput value="Guardar Cambios" />
              <Link className="lg:mt-5 text-lg font-semibold" to="/admin/perfil">
              Perfil
              </Link>
            </div>
          </form>
        </div>
      </section>
    </section>
  )
}

export default ChangePassword