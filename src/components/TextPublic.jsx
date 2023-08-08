const TextPublic = ({ text }) => {
  return (
    <div>
      <h1 className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent font-black py-2 text-6xl">
        {text}
      </h1>
      <img src="/Logo.svg" className="w-36 mx-auto md:w-44 md:mx-0 block"/>
    </div>
  );
};

export default TextPublic;
