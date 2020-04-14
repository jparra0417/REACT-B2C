import React, { useContext, useEffect } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import IProduct from "../interfaces/IProduct";
import HocProduct from "./HocProduct";
import BreadCrumb from "./BreadCrumb";

const Cart = (props) => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);

  useEffect(() => {
    console.log("Cart", state.cart);
  }, [state.cart, state.lang]);

  return (
    <div className="b2c-cart-container">
      <BreadCrumb value={[{ text: "Products", to: "/" }, { text: "Cart" }]} />
      <div className="b2c-cart">
        {state.cart.listProduct.map((product: IProduct) => {
          return (
            <div className="b2c-cart-product" key={product.item.id}>
              <div className="b2c-cart-product-name">{product.item.name}</div>
              <div className="b2c-cart-product-amount">
                <button
                  type="button"
                  onClick={() => props.removeProduct(product, 1, dispatch)}
                >
                  -
                </button>
                {product.amount}
                <button
                  type="button"
                  onClick={() => props.addProduct(product, 1, dispatch)}
                >
                  +
                </button>
              </div>
              <div className="b2c-cart-product-total">
                {product.totalValue.toLocaleString(state.lang)}
              </div>
              <div className="b2c-cart-product-remove">
                <button
                  type="button"
                  onClick={() =>
                    props.removeProduct(product, product.amount, dispatch)
                  }
                >
                  &times;
                </button>
              </div>
            </div>
          );
        })}        
      </div>
      <div className="b2c-cart-buttons">
        <button type="button">Payment</button>
      </div>
    </div>
  );
};

export default HocProduct(Cart);
