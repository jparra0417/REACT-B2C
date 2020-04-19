import React, { useEffect, useContext } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import { Link } from "react-router-dom";

const ToggleCart = () => {
  /** global */
  const { state } = useContext<IState | any>(Store);

  /** amount  */
  useEffect(() => {}, [state.cart.amount, state.lang]);

  return (
    <Link className="b2c-toggle-cart" to="/cart">
      <i className="fa fa-shopping-cart"></i>
      <div className="b2c-toggle-cart-amount">
        {state.cart.amount}
      </div>
    </Link>
  );
};

export default ToggleCart;
