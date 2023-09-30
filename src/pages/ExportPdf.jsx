import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CestinoPdf from "../components/CestinoPdf";
import GridCestini from "../components/GridCestini";
import Titles from "../components/Titles";
import useCestino from "../hooks/useCestino";
import Pdf from "../components/Pdf";
import useAuth from "../hooks/useAuth";

const ExportPdf = () => {
  const { auth } = useAuth();
  const { cestini } = useCestino();
  const [pdf, setPdf] = useState([]);

  return (
    <>
      <section className="flex flex-col justify-center items-center mt-8 mb-20 md:mb-8 container mx-auto overscroll-x-none">
        {cestini.length ? (
          <>
            <Titles text="Seleccione las canastas a exportar" />
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
          </>
        ) : (
          <>
            <img className="w-64 block" src="/Logo.svg" />
            <h4 className="text-3xl text-lime-900 px-5 dark:text-slate-200">
              Aún no tienes Canastas para exportar, comienza creando uno.
            </h4>
          </>
        )}
      </section>

      {pdf.length ? (
        <PDFDownloadLink
          document={<Pdf pdf={pdf} auth={auth.companyName}/>}
          fileName={auth.companyName ? `${auth.companyName}.pdf`: "cestino.pdf"}
        >
          <button className="px-5 py-3 rounded-md bg-lime-600 hover:bg-lime-700 transition-colors text-white font-bold text-xl fixed left-[8%] bottom-[5.5%] md:bottom-[8%] lg:left-[83%]">
            Descargar
          </button>
        </PDFDownloadLink>
      ) : null}
    </>
  );
};

export default ExportPdf;
