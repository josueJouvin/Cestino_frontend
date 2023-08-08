import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import TextPublic from "../components/TextPublic";
import useAccount from "../hooks/useAccount";


const ConfirmAccount = () => {
  const {alert, confirmedAccount, loading} = useAccount()
  return (
    <>
      <TextPublic text="Crea tu cuenta y administra tus productos"/>

      <div className="mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!loading && <Alert alert={alert}/>}
        {confirmedAccount && (
          <Link className="block text-center my-5 text-gray-600" to={"/"}>Iniciar Sesión</Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
