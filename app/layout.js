"use client";
import localFont from "next/font/local";
import "./globals.css";
import injectContext from "./context/appContext";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default injectContext(RootLayout);
