import { useState } from "react";
import CestinoPdf from "../components/CestinoPdf";
import GridCestini from "../components/GridCestini";
import Titles from "../components/Titles";
import useCestino from "../hooks/useCestino";
import Pdf from "../components/Pdf";
import { PDFViewer } from "@react-pdf/renderer";

const ExportPdf = () => {
  const { cestini } = useCestino();
  const [pdf, setPdf] = useState([]);
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }
  return (
    <>
      {!active && (
        <section className="flex flex-col justify-center items-center mt-8 mb-20 md:mb-8 container mx-auto overscroll-x-none">
        <Titles text="Seleccione las canastas a exportar" />
        {cestini.length ? (
          <GridCestini>
            {cestini.map((cestino) => (
              <CestinoPdf
                key={cestino._id}
                cestino={cestino}
                pdf={pdf}
                setPdf={setPdf}
              />
            ))}
          </GridCestini>
        ) : (
          <>
            <img className="w-64 block" src="/Logo.svg" />
            <h4 className="text-3xl text-lime-900 px-5 dark:text-slate-200">
              Aún no tienes Canastas creadas, comienza creando uno.
            </h4>
          </>
        )}
      </section>
      )}

      {active ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <Pdf pdf={pdf} />
        </PDFViewer>
      ) : null}

      {pdf.length ? (
          <button
            onClick={handleClick}
            className="px-5 py-3 rounded-md bg-lime-600 hover:bg-lime-700 transition-colors text-white font-bold text-xl fixed left-[8%] bottom-[5.5%] md:bottom-[8%] lg:left-[83%]"
          >
            {!active ? "Exportar pdf" : "Salir"}
          </button>
        ): null}
    </>
  );
};

export default ExportPdf;
