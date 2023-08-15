import { createContext, useState } from "react";

const ProductsContext = createContext();
const ProductsProvider = ({children}) => {
    const [productEdit, setProductEdit] = useState({});    
    const [products, setProducts] = useState([]);    

    return (
        <ProductsContext.Provider value={{ products, setProducts, productEdit, setProductEdit}}>
          {children}
        </ProductsContext.Provider>
      );
}

export {
    ProductsContext,
    ProductsProvider
}