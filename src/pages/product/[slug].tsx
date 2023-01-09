import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../client/components/Layout";
import data from "../../utils/data";
import { useActions } from "../../utils/store/useActions";

export default function ProductScreen() {
  const { slug } = useRouter().query;
  const actions = useActions();
  const product = data.products.find((p) => p.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            priority={true}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={() => actions.addToCart({ ...product })}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
