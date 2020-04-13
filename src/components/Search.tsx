import React, { useContext, useState, FormEvent } from "react";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import { EAction } from "../enums/EAction";

const Search = () => {
  /** global  */
  const { state, dispatch } = useContext<IState | any>(Store);
  /** local */
  const [search, setSearch] = useState(state.lookUp.search);

  /** dispatch search */
  const dispatchSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: EAction.MODIFY_LOOK_UP_SEARCH,
      payload: search,
    });
  };

  return (
    <div className="b2c-search">
      <form onSubmit={(e) => dispatchSearch(e)} autoComplete="false">
        <input
          type="search"
          id="filter"
          name="filter"
          placeholder="I am looking for..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
