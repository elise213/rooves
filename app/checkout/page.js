"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Context } from "../context/appContext";
import Swal from "sweetalert2";
import styles from "../page.module.css";
import Footer from "../components/footer";

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const total = store.cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [store.cart]);

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://rooves-back.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_items: store.cart.map((item) => ({
              id: item.id,
              price_id: item.price_id, // Use the correct price ID
              quantity: 1,
            })),
            success_url: window.location.origin + "/success",
            cancel_url: window.location.origin + "/checkout",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json(); // Get the session URL
      window.location.href = url; // Redirect the user to the Stripe-hosted checkout page
    } catch (error) {
      console.error("Checkout error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during checkout. Please try again.",
      });
    }
  };

  return (
    <>
      <div className={styles.checkoutPage}>
        <Link href="/">
          <button className={styles.backButton}>
            <span className={styles.arrow}>←</span> Back to Shop
          </button>
        </Link>

        {store.cart.length > 0 ? (
          <div className={styles.cartDiv}>
            <ul>
              {store.cart.map((item, index) => (
                <li className={styles.cartItem} key={index}>
                  {item.name} - ${item.price}
                  <button
                    className={styles.remove}
                    onClick={() => actions.removeFromCart(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className={styles.total}>Total: ${totalAmount}</p>

            <div className={styles.termsDiv}>
              <input
                className={styles.termsCheck}
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="terms">
                By checking this box you are bound to the{" "}
                <Link href="/terms">
                  terms of the subscription and rules of the group
                </Link>
                .
              </label>
            </div>

            {isChecked && (
              <button className={styles.addToCart} onClick={handleCheckout}>
                Proceed to Payment
              </button>
            )}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
