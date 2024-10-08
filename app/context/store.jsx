"use client";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      cart: [],
    },
    actions: {
      addToCart: (product) => {
        const store = getStore();
        setStore({
          cart: [...store.cart, product], // Append the new product to the existing cart
        });
      },
      removeFromCart: (index) => {
        const store = getStore();
        setStore({
          cart: store.cart.filter((_, i) => i !== index),
        });
      },
    },
  };
};

export default getState;
