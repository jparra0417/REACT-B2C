import React from "react";
import IProduct from "../interfaces/IProduct";
import { EAction } from "../enums/EAction";

const HocProduct = (WrappedComponent) => {
  return (props) => {    

    const addProduct = (product: IProduct, amount: number, dispatch: any) => {
      dispatch({
        type: EAction.ADD_CART_PRODUCT,
        payload: { ...product, amount: amount },
      });
    };

    const removeProduct = (product: IProduct, amount: number, dispatch: any) => {
      dispatch({
        type: EAction.REMOVE_CART_PRODUCT,
        payload: { ...product, amount: amount },
      });
    };

    return (
      <WrappedComponent
        {...props}
        addProduct={addProduct}
        removeProduct={removeProduct}
      ></WrappedComponent>
    );
  };
};

export default HocProduct;
