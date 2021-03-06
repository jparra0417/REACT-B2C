import IState from "./interfaces/IState";
import React, { useReducer, createContext } from "react";
import { IAction } from "./interfaces/IAction";
import { EAction } from "./enums/EAction";
import { ESort } from "./enums/ESort";
import ICart from "./interfaces/ICart";
import IProduct from "./interfaces/IProduct";
import UtilNumber from "./utils/UtilNumber";

/** initial state of the store */
const initialState: IState = {
  cart: {
    listProduct: [],
    taxValue: 0,
    totalValue: 0,
    amount: 0,
  },
  lookUp: {
    search: "",
    sort: [
      { property: "name", sort: ESort.NA },
      { property: "type", sort: ESort.NA },
      { property: "totalValue", sort: ESort.NA },
    ],
  },
  pager: {
    length: 0,
    limit: 10,
    page: 0,
  },
  lang: "en",
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
    filteredProduct[0].totalValue = UtilNumber.setPrecision(
      product.item.totalValue * filteredProduct[0].amount
    );
  } else
    listProduct.push({
      ...product,
      amount: product.amount,
      totalValue: UtilNumber.setPrecision(
        product.item.totalValue * product.amount
      ),
    });

  return calculateCart(cart, listProduct);
};

const removeProduct = (cart: ICart, product: IProduct): ICart => {
  let listProduct = cart.listProduct;
  let filteredProduct = listProduct.filter(
    (p: IProduct) => p.item.id === product.item.id
  );

  if (filteredProduct && filteredProduct.length) {
    filteredProduct[0].amount -= product.amount;
    // if > 0 recalculate the total value
    if (filteredProduct[0].amount > 0)
      filteredProduct[0].totalValue = UtilNumber.setPrecision(
        product.item.totalValue * filteredProduct[0].amount
      );
    // otherwise, remove from the list
    else
      listProduct = listProduct.filter(
        (p: IProduct) => p.item.id !== product.item.id
      );
  }

  return calculateCart(cart, listProduct);
};

const calculateCart = (cart: ICart, listProduct: IProduct[]): ICart => {
  let amount = 0;
  let totalValue = 0;
  listProduct.forEach((p: IProduct) => {
    amount += p.amount;
    UtilNumber.setPrecision((totalValue += p.totalValue));
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
    case EAction.MODIFY_LOOK_UP_SEARCH:
      return { ...state, lookUp: { ...state.lookUp, search: action.payload } };
    case EAction.ADD_CART_PRODUCT:
      return { ...state, cart: addProduct(state.cart, action.payload) };
    case EAction.REMOVE_CART_PRODUCT:
      return { ...state, cart: removeProduct(state.cart, action.payload) };
    case EAction.MODIFY_PAGER_LENGTH:
      return {
        ...state,
        pager: { ...state.pager, length: action.payload, page: 0 },
      };
    case EAction.MODIFY_PAGER_LIMIT:
      return {
        ...state,
        pager: { ...state.pager, limit: action.payload, page: 0 },
      };

    case EAction.SET_INVOICE:
      return {
        ...state,
        invoice: { ...action.payload },
      };

    case EAction.RESET_CART:
      return {
        ...state,
        cart: { ...initialState.cart, listProduct: [] },
      };

    case EAction.MODIFY_PAGER_PAGE:
      return { ...state, pager: { ...state.pager, page: action.payload } };
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
