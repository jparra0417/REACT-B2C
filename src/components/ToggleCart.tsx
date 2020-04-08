import React, { useState, useEffect, useContext } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import { EAction } from "../enums/EAction";

const ToggleCart = () => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);
  /** local */
  const [length, setLength] = useState(state.cart.listProduct.length);

  /** length  */
  useEffect(() => {
    setLength(state.cart.listProduct.length);
  }, [state.cart.listProduct.length]);

  /** dispatch cart active */
  const dispatchCartActive = () => {
    dispatch({
      type: EAction.MODIFY_CART_ACTIVE,
      payload: !state.cart.active,
    });
  };

  return (
    <div className="b2c-toggle-cart">
      <button type="button" onClick={() => dispatchCartActive()}>
        {length}
      </button>
    </div>
  );
};

export default ToggleCart;
