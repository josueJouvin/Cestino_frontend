import Footer from "../components/Footer";
import FruitsImg from "../components/FruitsImg";
import HeaderNav from "../components/HeaderNav";

const LandingPage = () => {
  return (
    <>
      <HeaderNav />
      <div className="container mx-auto px-5">
        <header className="flex flex-col lg:flex-row justify-between items-center gap-14 xl:gap-52 py-14 md:py-20 xl:h-[85vh]">
          <div className="">
            <h1 className="text-6xl bg-gradient-to-r from-lime-700 to-green-600 bg-clip-text text-transparent leading-[60px] md:leading-none md:text-7xl 2xl:text-[85px] font-bold">Construye tus canasta de forma sencilla</h1>
            <p className="py-5 text-xl md:text-2xl font-medium text-gray-800 dark:text-slate-200">
              Cestino te ayuda a organizar tus recetas, crea colecciones, gestiona listas de compras, víveres, entre otros.
            </p>
          </div>
          <div className="md:relative">
            <FruitsImg/>
            <img src="/cestinoProducts.png" alt="" className="block md:absolute md:top-0 md:left-20 w-80"/>
          </div>
        </header>
        <main className="my-8">
          <section className="flex flex-col justify-center items-center gap-5">
            <h3 className="text-3xl dark:text-lime-600">Guarda y Organiza tus Víveres, Recetas, Listas.</h3>
            <p className="lg:px-60 text-xl dark:text-slate-200">Crea tus canastas desde cualquier lugar y organízalas como quieras. Puedes usarlos en cualquier dispositivo en cualquier momento: Tus canastas ahora puede vivir en su bolsillo.</p>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-20 pt-8">
              <img src="/cestino1.webp" alt="Ejemplo Cestino 1" className="h-[550px] md:h-[600px]"/>
              <img src="/cestino2.webp" alt="Ejemplo Cestino 2" className="h-[550px] md:h-[600px]"/>
            </div>
          </section>
          <section  className="flex flex-col justify-center items-center gap-5 my-20">
            <h3 className="text-3xl dark:text-lime-600">Exporta tus canastas</h3>
            <p className="lg:px-60 text-xl dark:text-slate-200">Exporta y comparte tus canastas fácilmente con tus contactos en un formato accesible y práctico, para que todos vean tus creaciones..</p>
            <img className="pt-6 h-[550px] md:h-[600px]" src="/Pdf.webp" alt="cestino pdf"/>
          </section>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default LandingPage;
 