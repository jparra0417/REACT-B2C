import React, { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import { EAction } from "../enums/EAction";

const Pager = () => {
  /** global  */
  const { state, dispatch } = useContext<IState | any>(Store);
  /** local */
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    console.log("change pager");
    let _total: number = 0;
    if (state.pager.length > 0 && state.pager.limit > 0) {
      _total = Math.ceil(state.pager.length / state.pager.limit);
    }
    setTotal(_total);
  }, [state.pager]);

  const dispatchLimit = (strValue: string) => {
    const _limit = parseInt(strValue);
    if (_limit) {
      dispatch({
        type: EAction.MODIFY_PAGER_LIMIT,
        payload: _limit,
      });
    }
  };

  const dispatchPage = (to: number) => {
    if (to >= 0 && to < total) {
      dispatch({
        type: EAction.MODIFY_PAGER_PAGE,
        payload: to,
      });
    }
  };

  return (
    <div className="b2c-controls">
      {total > 0 ? (
        <>
          <div className="b2c-pager">
            <button
              type="button"
              onClick={() => dispatchPage(state.pager.page - 1)}
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            <span>{state.pager.page + 1}</span>
            <span>/</span>
            <span>{total}</span>
            <button
              type="button"
              onClick={() => dispatchPage(state.pager.page + 1)}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
          <div className="b2c-limit">
            <select
              value={state.pager.limit}
              onChange={(e) => dispatchLimit(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pager;
