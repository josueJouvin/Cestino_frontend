import { createContext, useState } from "react";

const ProductContext = createContext();
const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);    

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
          {children}
        </ProductContext.Provider>
      );
}

export {
    ProductContext,
    ProductProvider
}