import { EditIcon, TrashIcon } from "./Icons";
import { useEffect } from "react";
import useCestino from "../hooks/useCestino";

function ListProducts({ product, setFormProducts }) {
  const { products, setProducts, setProductEdit, productEdit } = useCestino();

  useEffect(() => {
    setFormProducts({
      nameproduct: productEdit.nameproduct,
      quantity: productEdit.quantity,
      unitmeasure: productEdit.unitmeasure,
      price: productEdit.price,
      id: productEdit.id ? productEdit.id : productEdit._id,
    });
  }, [productEdit]);

  useEffect(() => {
    setFormProducts({
      nameproduct: "",
      quantity: "",
      unitmeasure: "",
      price: "",
      id: "",
    });
  }, [products]);

  function deleted(id) {
    const deleted = products.filter(
      (produ) => produ.id !== id && produ._id !== id
    );
    setProducts(deleted);
  }

  return (
    <li className="flex border-b-2 dark:border-b-slate-400 py-2 group">
      <p className="w-full font-medium">{product.nameproduct}</p>
      <div className="flex items-center justify-between gap-5 md:gap-8 lg:gap-9">
        <p className="whitespace-nowrap tracking-wide">{`${product.quantity} ${product.unitmeasure}`}</p>
        <p className="w-4 whitespace-nowrap mr-3 md:mr-0">$ {product.price}</p>
        <div className=" md:w-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={() => setProductEdit(product)}>
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={() => deleted(product.id ? product.id : product._id)}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ListProducts;
