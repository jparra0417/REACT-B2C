import React, { useContext, useEffect } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import IProduct from "../interfaces/IProduct";
import HocProduct from "./HocProduct";
import BreadCrumb from "./BreadCrumb";
import Cashier from "./Cashier";

const Cart = (props) => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);


  useEffect(() => {
    // console.log("Changed cart", state.cart)
  }, [state.cart, state.lang]);

  const removeAmount = (product: IProduct) => {
    if (product.amount > 1) props.removeProduct(product, 1, dispatch);
  };
  

  if (!state.cart.listProduct || !state.cart.listProduct.length)
    return (
      <div className="b2c-cart-container">
        <BreadCrumb value={[{ text: "Products", to: "/" }, { text: "Cart" }]} />
        <div className="b2c-cart-not-found">
          There is not any product added...
        </div>
      </div>
    );
  return (
    <div className="b2c-cart-container">
      <BreadCrumb
        value={[
          { text: "Products", to: "/" },
          { text: "Cart" },
        ]}
      />
      <div className="b2c-cart">
        <div className="b2c-cart-actions">
          <div className="b2c-cart-total-value">
            Total $
            {state.cart.totalValue.toLocaleString(state.lang, {
              minimumFractionDigits: 1,
            })}
          </div>
          <Cashier />
        </div>
        <div className="b2c-cart-list-products">
          <div className="b2c-cart-product">
            <div className="b2c-cart-title">Product</div>
            <div className="b2c-cart-title">Amount</div>
            <div className="b2c-cart-title">Price $</div>
            <div className="b2c-cart-title">&nbsp;</div>
          </div>
          {state.cart.listProduct.map((product: IProduct) => {
            return (
              <div className="b2c-cart-product" key={product.item.id}>
                <div className="b2c-cart-product-name">{product.item.name}</div>
                <div className="b2c-product-amount-buttons">
                  <button type="button" onClick={() => removeAmount(product)}>
                    <span className="fa fa-minus"></span>
                  </button>
                  <span className="b2c-product-amount">{product.amount}</span>
                  <button
                    type="button"
                    onClick={() => props.addProduct(product, 1, dispatch)}
                  >
                    <span className="fa fa-plus"></span>
                  </button>
                </div>
                <div className="b2c-cart-product-total">
                  {product.totalValue.toLocaleString(state.lang, {
                    minimumFractionDigits: 1,
                  })}
                </div>
                <div className="b2c-cart-product-remove">
                  <button
                    type="button"
                    onClick={() =>
                      props.removeProduct(product, product.amount, dispatch)
                    }
                  >
                    <span className="fa fa-close"></span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HocProduct(Cart);
