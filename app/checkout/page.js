"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Context } from "../context/appContext";
import Swal from "sweetalert2";
import styles from "../page.module.css";
import Footer from "../components/footer";
import BeachAccessIcon from "@mui/icons-material/BeachAccess"; // Palm Tree alternative
import AppleIcon from "@mui/icons-material/Apple";
import LocationCityIcon from "@mui/icons-material/LocationCity"; // Cityscape for LA

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Calculate total amount whenever the cart changes
    const total = store.cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [store.cart]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const lineItems = store.cart.map((item) => ({
      price: item.stripePriceId,
      quantity: 1,
    }));

    try {
      const result = await stripe.redirectToCheckout({
        lineItems,
        mode: "subscription",
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/",
      });

      if (result.error) {
        console.error("Stripe error:", result.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error.message,
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
