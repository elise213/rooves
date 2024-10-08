"use client";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      cart: [], // Start with an empty cart to avoid SSR mismatch
    },
    actions: {
      loadCartFromSession: () => {
        if (typeof window !== "undefined") {
          const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
          setStore({ cart: savedCart });
        }
      },
      addToCart: (product) => {
        const store = getStore();
        const updatedCart = [...store.cart, product];

        setStore({ cart: updatedCart });
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      },
      removeFromCart: (index) => {
        const store = getStore();
        const updatedCart = store.cart.filter((_, i) => i !== index);

        setStore({ cart: updatedCart });
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      },
      clearCart: () => {
        setStore({ cart: [] });
        sessionStorage.removeItem("cart");
      },
    },
  };
};

export default getState;
