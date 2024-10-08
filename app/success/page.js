"use client";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/appContext";
import Link from "next/link";
import Swal from "sweetalert2";
import styles from "../page.module.css";
import Footer from "../components/footer";

const Success = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Thank you for joining our community!",
      confirmButtonText: "Close",
    });
  }, []);

  useEffect(() => {
    actions.clearCart();
  }, []);

  return (
    <>
      <div className={styles.success}>
        <p>Thank you for joining our community! 🥳</p>
        <p>Please allow 48 hours to be added to the group.</p>
        <Link href="/">
          <button className={styles.backButton}>Back to Shop</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Success;
