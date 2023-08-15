import { useContext } from "react";
import CestinoContext from "../context/CestinoProvider"; 

const useCestino = () => {
    return useContext(CestinoContext)
}

export default useCestino