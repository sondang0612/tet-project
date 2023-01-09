import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../client/components/Layout";
import { RootState } from "../utils/store/store";
import { AiOutlineDelete } from "react-icons/ai";
import { useActions } from "../utils/store/useActions";
import { useRouter } from "next/router";
import { Product } from "../types";

export default function CartScreen() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const router = useRouter();
  const actions = useActions();

  const subTotals = cartItems.reduce((a, c) => a + c.quantity, 0);
  const totalPrice = cartItems.reduce((a, c) => a + c.price, 0);

  const handleCheckout = () => {
    router.push("/shipping");
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    actions.updateCart({ productId, quantity });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/" legacyBehavior>
            <a className="text-blue-500">Go Shopping</a>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md-gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(({ product, ...item }) => {
                  return (
                    <tr key={product.slug} className="border-b">
                      <td>
                        <Link legacyBehavior href={`/product/${product.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={50}
                              height={50}
                            />
                            &nbsp;
                            {product.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {Array(product.countInStock)
                            .fill("")
                            .map((x, index) => (
                              <option
                                key={`${product.id}-${index}`}
                                value={index + 1}
                              >
                                {index + 1}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => actions.removeFromCart(product.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mx-5">
            <div className="card p-5">
              <ul>
                <li className="pb-3 justify-between flex">
                  <span>Subtotal ({subTotals}):</span>
                  <span>${totalPrice}</span>
                </li>
                <li className="pb-3 justify-between flex">
                  <span>Delivery cost:</span>
                  <span>$5</span>
                </li>
                <li className="pb-3 justify-between flex">
                  <span>Discount:</span>
                  <span>5%</span>
                </li>

                <li className="pb-3 pt-10 justify-between flex relative font-bold">
                  <div className="h-[1px] w-full bg-black absolute top-2" />
                  <span>Total Price:</span>
                  <span>$100</span>
                </li>
                <li>
                  <button
                    className="primary-button w-full"
                    onClick={handleCheckout}
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
