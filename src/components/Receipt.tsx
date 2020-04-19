import React, { useContext } from "react";
import { IInvoice } from "../interfaces/IInvoice";
import IProduct from "../interfaces/IProduct";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import UtilString from "../utils/UtilString";
import UtilDate from "../utils/UtilDate";

const Receipt = (props: { invoice: IInvoice }) => {
  const { state } = useContext<IState | any>(Store);

  return (
    <div className="b2c-invoice">
      <div className="b2c-invoice-logo">
        <span className="fa fa-check-circle-o"></span>
      </div>
      <div className="b2c-invoice-two">
        <div className="b2c-invoice-label">id</div>
        <div className="b2c-invoice-value">{props.invoice.id}</div>
        <div className="b2c-invoice-label">Date</div>
        <div className="b2c-invoice-value">
          {UtilDate.printDateByTimestamp(props.invoice.date, state.lang)}
        </div>
      </div>

      <div className="b2c-invoice-three">
        {props.invoice.cart.listProduct.map((product: IProduct) => {
          return (
            <React.Fragment key={product.item.id}>
              <div className="b2c-invoice-label">{product.item.name}</div>
              <div className="b2c-invoice-value">{product.amount}</div>
              <div className="b2c-invoice-value">
                {UtilString.printNumber(product.totalValue, state.lang)}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="b2c-invoice-two">
        <div className="b2c-invoice-label">Total</div>
        <div className="b2c-invoice-value">
          {UtilString.printNumber(props.invoice.cart.totalValue, state.lang)}
        </div>
        <div className="b2c-invoice-label">Payment</div>
        <div className="b2c-invoice-value">
          {UtilString.printNumber(props.invoice.payment, state.lang)}
        </div>

        <div className="b2c-invoice-label">Change</div>
        <div className="b2c-invoice-value">
          {UtilString.printNumber(props.invoice.change, state.lang)}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
