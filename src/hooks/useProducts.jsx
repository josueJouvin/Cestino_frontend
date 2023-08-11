import { useContext } from "react";
import { ProductContext } from "../context/ProductProvider";

const useProducts = () => {
    return useContext(ProductContext)
}

export default useProducts
