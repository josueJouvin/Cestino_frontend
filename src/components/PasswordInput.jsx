import { useState } from "react";

const PasswordInput = ({setPassword, password}) => {
  const [show, setShow] = useState(false)

  function handleClick(){
    setShow(!show)
  }

  return (
    <div className="my-5 relative">
      <label
        htmlFor="password"
        className="uppercase text-gray-700 block text-xl font-bold"
      >
        Contraseña
      </label>
      <div className="flex justify-between items-center">
      <input
        id="password"
        name="password"
        type={show ? "text" : "password"}
        placeholder="password"
        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
        value={password}
        onChange={setPassword}
      />
        <img alt="Toggle Password Visibility" src={show ? "/hiddenPassword.svg" : "/showPassword.svg"} className="z-10 absolute right-5 top-[60%] cursor-pointer block" onClick={handleClick}/>
      </div>
    </div>
  );
};

export default PasswordInput;
