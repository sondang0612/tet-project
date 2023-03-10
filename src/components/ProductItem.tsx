/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Product } from "../../types";
import { useActions } from "../../utils/store/useActions";

type Props = {
  product: Product;
};

export default function ProductItem(props: Props) {
  const { product } = props;
  const actions = useActions();

  return (
    <div className="card">
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link legacyBehavior href={`/product/${product.slug}`}>
          <a>
            <h2>{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => actions.addToCart({ ...product })}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
