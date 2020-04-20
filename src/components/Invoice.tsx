import React, { useEffect, useContext } from "react";
import BreadCrumb from "./BreadCrumb";
import Change from "./Change";
import Receipt from "./Receipt";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import { EAction } from "../enums/EAction";

const Invoice = () => {
  const { state, dispatch } = useContext<IState | any>(Store);

  useEffect(() => {
    console.log("entra a invoice");
    dispatch({ type: EAction.RESET_CART });
  }, [state.invoice, dispatch]);

  if (!state.invoice)
    return (
      <div className="b2c-cart-container">
        <BreadCrumb
          value={[{ text: "Home", to: "/" }, { text: "Invoice" }]}
        />
        <div className="b2c-cart-not-found">There is not any invoice...</div>
      </div>
    );

  return (
    <div className="b2c-cart-container">
      <BreadCrumb
        value={[{ text: "Home", to: "/" }, { text: "Invoice" }]}
      />

      <h2>Thanks for your purchase!</h2>
      <div className="b2c-invoice-wrapper">
        <section>
          <h3>Receipt</h3>
          <Receipt invoice={state.invoice}></Receipt>
        </section>
        <section>
          <h3>Change</h3>
          <Change changeCash={state.invoice.changeCash} />
        </section>
      </div>
      <p>
        <Link to="/">Continue buying...</Link>
      </p>
    </div>
  );
};

export default Invoice;
