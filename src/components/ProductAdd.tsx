import React, { useState, useEffect, useContext, useRef } from "react";
import IProduct from "../interfaces/IProduct";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import HocProduct from "./HocProduct";
import { Link } from "react-router-dom";
import UtilString from "../utils/UtilString";
import UtilNumber from "../utils/UtilNumber";

const ProductAdd = (props) => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);
  /** local */
  const [product, setProduct] = useState<IProduct>(props.product);
  const badge = useRef<HTMLDivElement>();

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
    badge.current.classList.add("active");
    if (badge && badge.current && badge.current.classList) {
      setTimeout(() => {
        if (badge && badge.current && badge.current.classList)
          badge.current.classList.remove("active");
      }, 2500);
    }
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
      totalValue: UtilNumber.setPrecision(amount * prevProduct.item.totalValue),
    };
  };

  return (
    <>
      <div className="b2c-product-total-container">
        <div className="b2c-product-added" ref={badge}>
          <Link to="/cart">
            Added <span className="fa fa-check-circle"></span>
          </Link>
        </div>
        <div className="b2c-product-total-value">
          <sup>$</sup>
          <span className="value">
            {UtilString.printNumber(product.totalValue, state.lang)}
          </span>
        </div>
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
