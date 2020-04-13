import React, { useState, useEffect, useContext } from "react";
import IProduct from "../interfaces/IProduct";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import HocProduct from "./HocProduct";

const ProductAdd = (props) => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);
  /** local */
  const [product, setProduct] = useState<IProduct>(props.product);

  useEffect(() => {}, [state.lang]);

  const reset = () => {
    setProduct((prevProduct: IProduct) => {
      return calculate(prevProduct, 1);
    });
  };

  const decrement = () => {
    setProduct((prevProduct: IProduct) => {
      return calculate(
        prevProduct,
        prevProduct.amount - 1 >= 1 ? prevProduct.amount - 1 : 1
      );
    });
  };

  const add = () => {
    console.log("props", props);
    props.addProduct(product, product.amount, dispatch);
    reset();
  };

  const increment = () => {
    setProduct((prevProduct: IProduct) => {
      return calculate(prevProduct, prevProduct.amount + 1);
    });
  };

  const calculate = (prevProduct: IProduct, amount: number): IProduct => {
    return {
      ...prevProduct,
      amount: amount,
      totalValue: amount * prevProduct.item.totalValue,
    };
  };

  return (
    <>
      <div className="b2c-product-total-value">
        <sup>$</sup>
        <span className="value">
          {product.totalValue.toLocaleString(state.lang)}
        </span>
      </div>
      <div className="b2c-product-buttons">
        <div className="b2c-product-amount-buttons">
          <button type="button" onClick={() => decrement()}>
            <span className="fa fa-minus"></span>
          </button>
          <span className="b2c-product-amount">{product.amount}</span>
          <button type="button" onClick={() => increment()}>
            <span className="fa fa-plus"></span>
          </button>
        </div>
        <div className="b2c-product-add-button">
          <button type="button" onClick={() => add()}>
            Add <span className="fa fa-cart-plus"></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HocProduct(ProductAdd);
