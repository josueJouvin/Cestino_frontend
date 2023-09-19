import { useEffect, useState } from "react";
import ButtomInput from "../components/ButtomInput";
import useAuth from "../hooks/useAuth";
import alertToast from "../utilities/alertToast";
import { Link } from "react-router-dom";
import Titles from "../components/Titles";

const EditProfile = () => {
  const { auth, updateProfile} = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    const { name, email, phone } = profile;

    if ([name.trim(), email.trim()].includes("")) {
      alertToast({type: "error", msg: "Email y Nombre son obligatorios" });
      return;
    }

    if (phone) {
      if (isNaN(phone)) {
        alertToast({ type: "warning", msg: "Debe ser un numero telefonico valido" });
        return;
      }
    }
    const response = await updateProfile(profile);
    if(response.error){
      alertToast({type: "error", msg: response.msg})
    }else{
      alertToast({type: "success", msg: response.msg})
    }
  }

  return (
    <section className=" flex flex-col w-full px-5 md:px-0">
      <Titles text="Editar Perfil"/>

      <section className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-200/95 rounded-lg p-5 shadow-card dark:shadow-cardD border-2 border-gray-800">
          <form onSubmit={handelSubmit}>
            <div className="my-3">
              <label htmlFor="name" className="uppercase font-bold text-gray-800">
                Nombre
              </label>
              <input
                type="text" name="name" id="name" placeholder="Cestino Web"
                className="border bg-gray-100 w-full p-2 mt-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={profile.name || ""} onChange={handleChange}
              />
            </div>

            <div className="my-5">
              <label htmlFor="companyName" className="uppercase font-bold text-gray-800">
                Nombre de Emprendimiento / Negocio
              </label>
              <input
                type="text" name="companyName" id="companyName" placeholder="Canastas la Vecina, Un Postre mas, ..."
                className="border bg-gray-100 w-full p-2 mt-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={profile.companyName || ""} onChange={handleChange}
              />
            </div>

            <div className="my-5">
              <label htmlFor="phone" className="uppercase font-bold text-gray-800">
                Teléfono
              </label>
              <input
                type="tel" name="phone" id="phone" placeholder="0912345678" autoComplete="off"
                className="border bg-gray-100 w-full p-2 mt-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={profile.phone || ""} onChange={handleChange}
              />
            </div>

            <div className="my-5">
              <label htmlFor="email" className="uppercase font-bold text-gray-800">
                Correo
              </label>
              <input
                type="email" name="email" id="email" placeholder="cestino@cestino.com"
                className="border bg-gray-100 w-full p-2 mt-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={profile.email || ""} onChange={handleChange}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
              <ButtomInput value="Guardar Cambios" />
              <Link className="lg:mt-5 text-lg font-semibold" to="/admin/cambiar-password">
              Cambiar contraseña
              </Link>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default EditProfile;
