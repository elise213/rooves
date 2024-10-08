"use client";
import React, { useContext } from "react";
import { Context } from "../context/appContext";
import Link from "next/link";
import styles from "../page.module.css";

const Footer = () => {
  const { store, actions } = useContext(Context);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerDiv1}>
        <div className={styles.sitemap}>
          <Link href="/" passHref>
            HOME
          </Link>
          <a href="https://billing.stripe.com/p/login/5kA9BZ1aE7ZDgAo9AA">
            MANAGE SUBSCRIPTION
          </a>
          <Link href="/terms" passHref>
            RULES TERMS & CONDITIONS
          </Link>
          <Link href="/contact" passHref>
            CONTACT
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
