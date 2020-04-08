import React, { useContext, useState, FormEvent } from "react";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import { EAction } from "../enums/EAction";

const LookUp = () => {
  /** global  */
  const { state, dispatch } = useContext<IState | any>(Store);
  /** local */
  const [lookUp, setLookUp] = useState(state.lookUp);

  /** dispatch lookUp */
  const dispatchLookUp = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: EAction.MODIFY_LOOK_UP,
      payload: lookUp,
    });
  };

  return (
    <div className="b2c-lookUp">
      <form onSubmit={(e) => dispatchLookUp(e)}>
        <div className="b2c-control">
          <label htmlFor="search">Search</label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search"
            value={lookUp.search}
            onChange={(e) => setLookUp({ ...lookUp, search: e.target.value })}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default LookUp;
