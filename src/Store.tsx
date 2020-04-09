import IState from "./interfaces/IState";
import React, { useReducer, createContext } from "react";
import { IAction } from "./interfaces/IAction";
import { EAction } from "./enums/EAction";
import { ESort } from "./enums/ESort";
import ICart from "./interfaces/ICart";
import IProduct from "./interfaces/IProduct";

/** initial state of the store */
const initialState: IState = {
  cart: {
    listProduct: [],
    taxValue: 0,
    totalValue: 0,
    active: false,
    amount: 0,
  },
  lookUp: {
    search: "",
    sort: [
      { property: "name", sort: ESort.NA },
      { property: "type", sort: ESort.NA },
      { property: "totalValue", sort: ESort.NA },
    ],
    length: 10,
    page: 0,
  },
};

/** store */
export const Store = createContext<IState | any>(initialState);

/** functions */

const addProduct = (cart: ICart, product: IProduct): ICart => {
  let listProduct = cart.listProduct;
  let filteredProduct = listProduct.filter(
    (p: IProduct) => p.item.id === product.item.id
  );

  if (filteredProduct && filteredProduct.length) {
    filteredProduct[0].amount += product.amount;
    filteredProduct[0].totalValue += product.totalValue;
  } else listProduct.push(product);

  return calculateCart(cart, listProduct);
};

const calculateCart = (cart: ICart, listProduct: IProduct[]): ICart => {
  let amount = 0;
  let totalValue = 0;
  listProduct.forEach((p: IProduct) => {
    amount += p.amount;
    totalValue += p.totalValue;
  });

  return {
    ...cart,
    listProduct: listProduct,
    totalValue: totalValue,
    amount: amount,
  };
};

/** reducer */
const reducer = (state: IState, action: IAction) => {
  // console.log("state", state, "action", action);
  switch (action.type) {
    case EAction.MODIFY_LOOK_UP:
      return { ...state, lookUp: action.payload };
    case EAction.ADD_CART_PRODUCT:
      return { ...state, cart: addProduct(state.cart, action.payload) };
    case EAction.MODIFY_CART_ACTIVE:
      return { ...state, cart: { ...state.cart, active: action.payload } };
    default:
      return state;
  }
};

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};
