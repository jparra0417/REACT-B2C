import React, { useContext, useEffect, useState } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import IItem from "../interfaces/IItem";
import UtilString from "../utils/UtilString";
import * as Faker from "faker";
import { EAction } from "../enums/EAction";

const ListItem = () => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);

  /** local */
  const [listItem, setListItem] = useState<IItem[]>([]);

  useEffect(() => {
    /** function get total list Item */
    const getTotalListItem = (): IItem[] => {
      let listItem: IItem[] = [];
      if (!localStorage.getItem("b2c-list-item")) {
        for (let index = 0; index < 30; index++) {
          const item: IItem = {
            id: UtilString.generateUID(),
            name: Faker.commerce.productName(),
            type: Faker.commerce.product(),
            taxValue: Faker.commerce.price(),
            totalValue: Faker.commerce.price(),
            unitValue: Faker.commerce.price(),
            amount: 1,
            urlImage: Faker.image.imageUrl(),
          };
          listItem.push(item);
        }
        localStorage.setItem("b2c-list-item", JSON.stringify(listItem));
        return listItem;
      }
      return JSON.parse(localStorage.getItem("b2c-list-item"));
    };

    /** get total list item */
    const totalListItem = getTotalListItem();
    let listItem: IItem[] = totalListItem;
    /** pipeline */
    if (state.lookUp.search.length)
      listItem = listItem.filter((item: IItem) => {
        return (
          item.name.toLowerCase().indexOf(state.lookUp.search.toLowerCase()) >=
            0 ||
          item.type.toLowerCase().indexOf(state.lookUp.search.toLowerCase()) >=
            0
        );
      });

    setListItem(listItem);
  }, [state.lookUp]);

  const dispatchProduct = (item) => {
    dispatch({
      type: EAction.ADD_CART_PRODUCT,
      payload: item,
    });
  };

  return (
    <div className="b2c-list-item">
      {listItem.length ? (
        listItem.map((item: IItem) => {
          return (
            <div className="b2c-item" key={item.id}>
              <div className="b2c-item-name">{item.name}</div>
              <div className="b2c-item-type">{item.type}</div>
              <div className="b2c-item-total-value">
                {item.totalValue.toLocaleString("es")}
              </div>
              <button type="button" onClick={() => dispatchProduct(item)}>
                Add
              </button>
            </div>
          );
        })
      ) : (
        <div className="b2c-no-results">Not found</div>
      )}
    </div>
  );
};

export default ListItem;
