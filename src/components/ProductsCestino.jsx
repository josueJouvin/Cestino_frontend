import { Check } from "./Icons";

const ProductsCestino = ({ product }) => {
  return (
    <li className="flex justify-between items-center gap-8 text-[19px] mb-2 w-full overflow-hidden">
      <p className="font-semibold flex gap-2 items-center text-black break-words whitespace-normal w-full">
        <span className="rounded-full p-[2px] bg-lime-500">
          <Check />
        </span>
        <span className="break-all whitespace-normal">{product.nameproduct}</span>
      </p>
      <span className="text-gray-800 font-medium whitespace-nowrap text-lg">
        {product.quantity} {product.unitmeasure}
      </span>
    </li>
  );
};

export default ProductsCestino;
