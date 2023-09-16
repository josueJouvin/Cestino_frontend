import { GitHub, Linkedin, Youtube } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-lime-900 text-slate-200 py-5 flex justify-center items-center gap-8 md:text-xl">
      <a
        className="flex flex-col md:flex-row items-center gap-1 hover:text-lime-500 transition-all hover:scale-125 font-semibold"
        href="https://www.youtube.com/@jotajouvin27"
        target="_blank"
        rel="noreferrer"
      >
        <Youtube /> <span>Youtube</span>
      </a>
      <a
        className="flex flex-col md:flex-row items-center gap-1 hover:text-lime-500 transition-all hover:scale-125 font-semibold"
        href="https://www.linkedin.com/in/josuejouvin/"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin /> <span>Linkedin</span>
      </a>
      <a
        className="flex flex-col md:flex-row items-center gap-1 hover:text-lime-500 transition-all hover:scale-125 font-semibold"
        href="https://github.com/josueJouvin"
        target="_blank"
        rel="noreferrer"
      >
        <GitHub /> <span>GitHub</span>
      </a>
    </footer>
  );
};

export default Footer;
