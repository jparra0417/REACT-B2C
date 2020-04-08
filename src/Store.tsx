import IState from "./interfaces/IState";
import React, { useReducer, createContext } from "react";
import { IAction } from "./interfaces/IAction";
import { EAction } from "./enums/EAction";
import { ESort } from "./enums/ESort";


/** initial state of the store */
const initialState: IState = {
  cart: {
    listProduct: [],
    taxValue: 0,
    totalValue: 0,
    active: false,
  },
  lookUp: {
    search: "",
    sort: [
      { property: "name", sort: ESort.NA },
      { property: "type", sort: ESort.NA },
      { property: "totalValue", sort: ESort.NA },
    ],
    length: 0,
    page: 10,
  },
};

/** store */
export const Store = createContext<IState | any>(initialState);

/** reducer */
const reducer = (state: IState, action: IAction) => {
  // console.log("state", state, "action", action);
  switch (action.type) {
    case EAction.MODIFY_LOOK_UP:
      return { ...state, lookUp: action.payload };
    case EAction.ADD_CART_PRODUCT:
      // TODO: Add car product
      return { ...state, cart: action.payload };
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
