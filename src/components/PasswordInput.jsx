import { useState } from "react";

const PasswordInput = ({setPassword, password, newP}) => {
  const [show, setShow] = useState(false)

  function handleClick(){
    setShow(!show)
  }

  return (
    <div className="my-5 relative">
      <label
        htmlFor={newP ? "pwd_new": "password"}
        className={newP ? "uppercase font-bold text-gray-800 text-lg" : "uppercase text-gray-700 block text-xl font-bold"}
      >
        {newP ? "Contraseña Nueva" : "Contraseña"}
      </label>
      <div className="flex justify-between items-center">
      <input
        id={newP ? "pwd_new": "password"}
        name={newP ? "pwd_new": "password"}
        type={show ? "text" : "password"}
        placeholder="password"
        className={newP ? "border bg-gray-100 w-full p-2 mt-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500" : " border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"}
        value={password}
        onChange={setPassword}
      />
        <img alt="Toggle Password Visibility" src={show ? "/hiddenPassword.svg" : "/showPassword.svg"} className="z-10 absolute right-5 top-[60%] cursor-pointer block" onClick={handleClick}/>
      </div>
    </div>
  );
};

export default PasswordInput;
