import { useState } from "react";

const useSwitch = () => {
   const [show, setShow] = useState(false)
   const changeShow = () =>{
      setShow(!show)
   }

  return {  
     show, changeShow 
  }
}

export default useSwitch