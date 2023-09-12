import "./CestinoPdf.css";
import { Check } from "./Icons";

const CestinoPdf = ({ cestino, pdf, setPdf }) => {
  const { image, name, total } = cestino;

  const isCestinoSelected = pdf.includes(cestino);
  function handleClick(cestinoPdf) {
    if (isCestinoSelected) {
      setPdf((prevState) => prevState.filter((item) => item !== cestinoPdf));
    } else {
      setPdf((prevState) => [...prevState, cestinoPdf]);
    }
  }

  return (
    <>
    <div className="rounded-md py-2 px-3 border-2 border-solid border-gray-800 shadow-card dark:shadow-cardD flex flex-col lg:flex-row justify-between items-center align-middle gap-5 md:gap-7 dark:bg-slate-200/95 bg-white mt-8 lg:mt-0 w-full">
      <div className="transition-all duration-500 lg:hover:-translate-x-3 w-full">
          <img
            className="rounded-xl h-40 md:w-72 bg-gradient-to-r from-lime-500 to-lime-600 object-cover w-full"
            src={image ? image.secure_url : "/Logo.svg"}
            alt={`canasta ${name}`}
          />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-2xl text-center w-full break-words">
        <h3>{name}</h3>
        <span className="font-medium whitespace-nowrap">$ {Number(total).toFixed(2)}</span>
      </div>
      <button onClick={() => handleClick(cestino)} className={`card-btn py-1.5 px-5 border-2 border-solid border-gray-800 rounded-md transition-all duration-300 hover:border-lime-500 ${isCestinoSelected ? "border-lime-500" : ""}`}>
            <Check  isCestinoSelected={isCestinoSelected}/>
      </button>
    </div>
    </>
  );
};

export default CestinoPdf;
