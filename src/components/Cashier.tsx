import React, { useEffect, useContext, useState } from "react";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import { IInvoice } from "../interfaces/IInvoice";
import UtilString from "../utils/UtilString";
import { ICash } from "../interfaces/ICash";
import UtilNumber from "../utils/UtilNumber";
import ICart from "../interfaces/ICart";
import { EAction } from "../enums/EAction";
import { Redirect } from "react-router-dom";

const Cashier = () => {
  const { state, dispatch } = useContext<IState | any>(Store);

  const [redirect, setRedirect] = useState<boolean>(false);

  const initialInvoice: IInvoice = {
    id: UtilString.generateUID(),
    cart: state.cart,
    payment: 0,
    change: 0,
    due: 1,
    changeCash: [],
  };

  const cashArray1: ICash[] = [
    { value: 500, amount: 0, isCoin: false, label: "500" },
    { value: 100, amount: 0, isCoin: false, label: "100" },
    { value: 50, amount: 0, isCoin: false, label: "50" },
    { value: 20, amount: 0, isCoin: false, label: "20" },
    { value: 10, amount: 0, isCoin: false, label: "10" },
  ];
  const cashArray2: ICash[] = [
    { value: 5, amount: 0, isCoin: false, label: "5" },
    { value: 1, amount: 0, isCoin: true, label: "1" },
    { value: 0.5, amount: 0, isCoin: true, label: "50" },
    { value: 0.2, amount: 0, isCoin: true, label: "20" },
    { value: 0.1, amount: 0, isCoin: true, label: "10" },
  ];

  const [invoice, setInvoice] = useState<IInvoice>(initialInvoice);
  const addValue = (valueParam: number, cartParam?: ICart) => {
    setInvoice((prevInvoice) => {
      const value: number = valueParam ? valueParam : 0;
      const cart: ICart = cartParam ? cartParam : prevInvoice.cart;
      const payment: number = UtilNumber.setPrecision(
        prevInvoice.payment + value
      );
      const due: number = UtilNumber.setPrecision(cart.totalValue - payment);
      return {
        ...prevInvoice,
        payment: payment,
        due: due,
        cart: cart,
      };
    });
  };

  useEffect(() => {
    console.log("Entra primer effect")
    addValue(0, state.cart);
  }, [state.cart, state.lang]);

  useEffect(() => {
    console.log("OJO!", invoice.due);
    if (invoice.due <= 0) {
      console.log("Entró!", invoice.due);

      let currentInvoice : IInvoice = {
        ...invoice,
        change: invoice.due * -1,
        date: (new Date()).getTime(),
      };
      currentInvoice.due = 1;
      let cashArray: ICash[] = cashArray1.concat(cashArray2);
      let currentValue: number = currentInvoice.change;
      while (currentValue > 0) {
        for (const cash of cashArray) {
          const value = UtilNumber.setPrecision(currentValue - cash.value);
          if (value >= 0) {
            cash.amount++;
            currentValue = value;
            break;
          }
        }
      }

      currentInvoice.changeCash = cashArray.filter(
        (cash: ICash) => cash.amount > 0
      );

      dispatch({
        type: EAction.SET_INVOICE,
        payload: currentInvoice,
      });

      setInvoice(initialInvoice);      
      setRedirect(true)
    }
  }, [invoice, cashArray1, cashArray2, dispatch, initialInvoice]);

  if(redirect)
    return <Redirect to="/invoice" />;
 

  return (
    <div className="b2c-cashier">
      <div className="b2c-cashier-notes">
        {cashArray1.map((cash: ICash) => {
          return (
            <div
              key={cash.value}
              className={`b2c-cashier-cash ${cash.isCoin ? "b2c-coin" : ""} ${
                cash.value < 1 ? "b2c-cents" : ""
              }`}
              onClick={() => addValue(cash.value)}
            >
              {cash.label}
            </div>
          );
        })}
      </div>
      <div className="b2c-cashier-values">
        <div className="b2c-cashier-payment">
          Payment
          <div className="b2c-cashier-value">
            <sup>$</sup>
            <span className="value">
              {UtilString.printNumber(invoice.payment, state.lang)}
            </span>
          </div>
        </div>
        <div className="b2c-cashier-due">
          Due
          <div className="b2c-cashier-value">
            <sup>$</sup>
            <span className="value">
              {UtilString.printNumber(invoice.due, state.lang)}
            </span>
          </div>
        </div>
      </div>
      <div className="b2c-cashier-coins">
        {cashArray2.map((cash: ICash) => {
          return (
            <div
              key={cash.value}
              className={`b2c-cashier-cash ${cash.isCoin ? "b2c-coin" : ""} ${
                cash.value < 1 ? "b2c-cents" : ""
              }`}
              onClick={() => addValue(cash.value)}
            >
              {cash.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cashier;
