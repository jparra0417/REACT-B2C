import React, { useEffect, useContext } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import { EAction } from "../enums/EAction";

const ToggleCart = () => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);

  /** amount  */
  useEffect(() => {}, [state.cart.amount, state.lang]);

  /** dispatch cart active */
  const dispatchCartActive = () => {
    dispatch({
      type: EAction.MODIFY_CART_ACTIVE,
      payload: !state.cart.active,
    });
  };

  return (
    <button
      className="b2c-toggle-cart"
      type="button"
      onClick={() => dispatchCartActive()}
    >
      <i className="fa fa-shopping-cart"></i>
      <div className="b2c-toggle-cart-amount">
        {state.cart.amount.toLocaleString(state.lang)}
      </div>
    </button>
  );
};

export default ToggleCart;
