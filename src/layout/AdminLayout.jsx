import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavMenu from "../components/NavMenu";
import { NavOpen } from "../components/Icons";
import useSwitch from "../hooks/useSwitch";
import { ProductsProvider } from "../context/ProductProvider";
import { ToastContainer, toast } from "react-toastify";
import useCestino from "../hooks/useCestino";


const AdminLayout = () => {
  const { save} = useCestino();
  const { show, changeShow } = useSwitch();
  const { auth, loading } = useAuth();
  if (loading) return "cargando...";

  if (save) {
    toast.success("Agregado correctamente", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    
  }

  return (
    <>
      <ProductsProvider>
        <div className="lg:flex lg:min-h-screen">
          <ToastContainer />
          <button
            onClick={changeShow}
            className="fixed right-[10%] bottom-[6%] md:right-[12%] md:bottom-[8%] bg-lime-600 cursor-pointer p-2 rounded-full z-10 lg:hidden"
          >
            <NavOpen />
          </button>
          <NavMenu show={show} changeShow={changeShow} />
          {auth?._id ? (
            <main className="flex items-center justify-center lg:w-4/5">
              <Outlet />
            </main>
          ) : (
            <Navigate to="/" />
          )}
        </div>
      </ProductsProvider>
    </>
  );
};

export default AdminLayout;
