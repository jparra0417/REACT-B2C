import React, { useState, useEffect, useContext } from "react";
import IProduct from "../interfaces/IProduct";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import { EAction } from "../enums/EAction";

const ProductAdd = (props) => {
  /** global */
  const { dispatch } = useContext<IState | any>(Store);
  /** local */
  const [product, setProduct] = useState<IProduct>(props.product);

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  const decrement = () => {
    setProduct((prevProduct: IProduct) => {
      return calculate(
        prevProduct,
        prevProduct.amount - 1 >= 1 ? prevProduct.amount - 1 : 1
      );
    });
  };
  const dispatchProduct = () => {
    dispatch({
      type: EAction.ADD_CART_PRODUCT,
      payload: product,
    });
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
      totalValue: amount * prevProduct.unitValue,
    };
  };

  return (
    <div className="b2c-product-add">
      <button type="button" onClick={() => decrement()}>
        -
      </button>
      {product.amount}
      <button type="button" onClick={() => increment()}>
        +
      </button>
      <button type="button" onClick={() => dispatchProduct()}>
        Add to cart {product.totalValue.toLocaleString("es")}
      </button>
    </div>
  );
};

export default ProductAdd;
