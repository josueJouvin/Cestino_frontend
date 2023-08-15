import { EditIcon, TrashIcon } from "./Icons";
import useProducts from "../hooks/useProducts";
import { useEffect } from "react";

function ListProducts({ product, setFormProducts }) {
  const {products, setProducts, setProductEdit, productEdit} = useProducts()
  const { nameproduct, quantity, unitmeasure, price } = product;

  useEffect(() => {
    setFormProducts({
        nameproduct: productEdit.nameproduct,
        quantity: productEdit.quantity,
        unitmeasure: productEdit.unitmeasure,
        price: productEdit.price,
        id: productEdit.id
    })
},[productEdit])

  function deleted (id){
    const deleted = products.filter(produ => produ.id !== id)
    setProducts(deleted)
  }

  function modified(product){ 
    setProductEdit(product)
  }

  return (
    <li className="flex border-b-2 py-2 group">
      <p className="w-full font-medium">{nameproduct}</p>
      <div className="flex items-center justify-between gap-5 md:gap-8 lg:gap-9">
        <p className="whitespace-nowrap tracking-wide">{`${quantity} ${unitmeasure}`}</p>
        <p className="w-4 whitespace-nowrap mr-3 md:mr-0">$ {price}</p>
        <div className=" md:w-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={() => modified(product)}>
            <EditIcon />
          </button>
          <button type="button" onClick={() => deleted(product.id)}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ListProducts;
