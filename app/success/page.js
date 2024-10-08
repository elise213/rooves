"use client";
import React, { useContext } from "react";
import { Context } from "../context/appContext";
import Link from "next/link";
import styles from "../page.module.css";
import Footer from "../components/footer";

const Success = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className={styles.success}>
        <p>Thank you for joinging our community! 🥳</p>
        <p>Please allow 48 hours to be added to the group.</p>
      </div>
      <Footer />
    </>
  );
};

export default Success;
