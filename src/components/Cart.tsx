import React, { useContext, useEffect } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";

const Cart = () => {
  /** global */
  const { state } = useContext<IState | any>(Store);

  useEffect(() => {
    console.log("Cart", state.cart);
  }, [state.cart]);

  return (
    <div className={`b2c-cart ${state.cart.active ? "active" : ""}`}>:D</div>
  );
};

export default Cart;
