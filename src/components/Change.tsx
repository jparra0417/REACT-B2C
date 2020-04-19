import React, { Fragment } from "react";
import { ICash } from "../interfaces/ICash";

const Change = (props: { changeCash: ICash[] }) => {
  return (
    <div className="b2c-change">
      {props.changeCash.map((cash: ICash) => {
        return (
          <Fragment key={cash.value}>
            {Array.from(Array(cash.amount)).map((e, i) => {
              return (
                <div key={i}
                  className={`b2c-cashier-cash ${
                    cash.isCoin ? "b2c-coin" : ""
                  } ${cash.value < 1 ? "b2c-cents" : ""}`}
                >
                  {cash.label}
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Change;
