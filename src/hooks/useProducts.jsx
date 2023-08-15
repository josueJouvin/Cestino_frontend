import { useContext } from "react";
import { ProductsContext } from "../context/ProductProvider";

const useProducts = () => {
    return useContext(ProductsContext)
}

export default useProducts
