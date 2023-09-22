import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";

const NotFound = () => {
  return (
    <main className="flex flex-col justify-between h-screen">
        <HeaderNav/>  
        <section className="container mx-auto my-5">
          <h2 className="text-center font-semibold text-3xl md:text-[40px] text-lime-900 px-1 dark:text-slate-200">
            404 - No se encontro esta pagina
          </h2>
          <img
            className="mt-8 md:my-5 mx-auto block md:h-[550px]"
            src="/gatorbasket.svg"
            alt="pagina no encontrada"
          />
        </section>

        <Footer/>
    </main>
  );
};

export default NotFound;
