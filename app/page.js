"use client";
import React, { useContext } from "react";
import { Context } from "./context/appContext";
import Link from "next/link";
import styles from "./page.module.css";
import Footer from "./components/footer";

const products = [
  {
    id: 1,
    name: "New York",
    price: 25,
    stripePriceId: "price_1Q5HGNFOQNBOjDBoIwAphPjq",
    icon: "🍎", // Apple emoji for New York
  },
  {
    id: 2,
    name: "LA",
    price: 25,
    stripePriceId: "price_1Q5HFUFOQNBOjDBoBbK7yA8N",
    icon: "🎬", // Movie emoji for Los Angeles
  },
  {
    id: 3,
    name: "Miami",
    price: 25,
    stripePriceId: "price_1Q5HGvFOQNBOjDBoTNg4b0SV",
    icon: "🌴", // Palm tree emoji for Miami
  },
];

export default function Home() {
  const { store, actions } = useContext(Context);

  return (
    <div className={styles.page}>
      <div className={styles.limit}>
        <div className={styles.cart}>
          <div className={styles.cartIcon}>
            🛒
            {store.cart.length > 0}
            {store.cart.length > 0 && (
              <div className={styles.cartDropdown}>
                {store.cart.map((item, index) => (
                  <div key={index} className={styles.cartItem}>
                    {item.name} - ${item.price}
                    <span
                      className={styles.removeItem}
                      onClick={() => actions.removeFromCart(index)}
                    >
                      X
                    </span>
                  </div>
                ))}
                <Link href="/checkout" passHref>
                  <button className={styles.checkoutGo}>Go to Checkout</button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className={styles.productList}>
          {products.map((product) => {
            const isInCart = store.cart.some((item) => item.id === product.id);

            return (
              <div key={product.id} className={styles.product}>
                <h2>{product.name}</h2>
                <div className={styles.productIcon}>{product.icon}</div>{" "}
                {/* Display emoji */}
                <p>Price: ${product.price}</p>
                {isInCart ? (
                  <span>This item is in your cart</span>
                ) : (
                  <button
                    className={styles.addToCart}
                    onClick={() => actions.addToCart(product)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
