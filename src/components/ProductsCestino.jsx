import { Check } from "./Icons";

const ProductsCestino = ({ product }) => {
  return (
    <li className="flex justify-between items-center gap-5 text-lg mb-2">
      <p className="font-semibold flex gap-2 items-center text-black">
        <span className="rounded-full p-[2px] bg-lime-500">
          <Check />
        </span>
        {product.nameproduct}
      </p>
      <p className="text-black">
        {product.quantity} {product.unitmeasure}
      </p>
    </li>
  );
};

export default ProductsCestino;
