"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Context } from "../context/appContext";
import Swal from "sweetalert2";
import styles from "../page.module.css";
import Footer from "../components/footer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(
      "Stripe Key:",
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "No Key Found"
    );
    console.log(
      "Backend URL:",
      process.env.NEXT_PUBLIC_BACKEND_URL || "No backend Found"
    );
    const total = store.cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [store.cart]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_items: store.cart.map((item) => ({
              id: item.id,
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

      const { id: sessionId } = await response.json();
      console.log("Session ID received:", sessionId); // Add this log

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
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
