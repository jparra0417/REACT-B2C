import React, { useContext, useEffect, useState } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import UtilString from "../utils/UtilString";
import * as Faker from "faker";
import { EStorage } from "../enums/EStorage";
// import { Link } from "react-router-dom";
import IProduct from "../interfaces/IProduct";
import ProductAdd from "./ProductAdd";
import { EAction } from "../enums/EAction";
import Pager from "./Pager";
import { Link } from "react-router-dom";

const ListProduct = (props) => {
  /** global */
  const { state, dispatch } = useContext<IState | any>(Store);

  /** local */
  const [filteredListProduct, setFilteredListProduct] = useState<IProduct[]>(
    []
  );
  const [listProduct, setListProduct] = useState<IProduct[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  /** use effect when the ready  */
  useEffect(() => {
    setReady(false);
    setAlert(false);
    // function get total list Item
    const getTotalListProduct = (): IProduct[] => {
      let _filteredListProduct: IProduct[] = [];
      if (!localStorage.getItem(EStorage.B2C_LIST_PRODUCT)) {        
        setAlert(true);
        const img = [
          "viadeo-square",
          "car",
          "pied-piper",
          "first-order",
          "yoast",
          "ticket",
          "font-awesome",
          "handshake-o",
          "envelope-open-o",
          "linode",
          "birthday-cake",
          "recycle",
          "binoculars",
          "spinner",
          "user-circle",
          "newspaper-o",
          "history",
          "id-badge",
          "drivers-license",
        ];
        for (let index = 0; index < 50; index++) {
          const taxValue = Faker.commerce.price() / 5;
          const unitValue = Faker.commerce.price() / 2;
          const totalValue = taxValue + unitValue;

          const product: IProduct = {
            item: {
              id: UtilString.generateUID(),
              name: Faker.commerce.productName(),
              type: Faker.commerce.product(),
              taxValue: taxValue,
              unitValue: unitValue,
              totalValue: totalValue,
              amount: 1,
              urlImage: img[Math.floor(Math.random() * img.length)],
            },
            taxValue: taxValue,
            totalValue: totalValue,
            unitValue: unitValue,
            amount: 1,
          };

          _filteredListProduct.push(product);
        }
        localStorage.setItem(
          EStorage.B2C_LIST_PRODUCT,
          JSON.stringify(_filteredListProduct)
        );
        return _filteredListProduct;
      }
      return JSON.parse(localStorage.getItem(EStorage.B2C_LIST_PRODUCT));
    };

    // get total list item
    const totalListProduct = getTotalListProduct();
    let _filteredListProduct: IProduct[] = totalListProduct;
    // pipeline
    // search
    if (state.lookUp.search.length)
      _filteredListProduct = _filteredListProduct.filter(
        (product: IProduct) => {
          return (
            product.item.name
              .toLowerCase()
              .indexOf(state.lookUp.search.toLowerCase()) >= 0 ||
            product.item.type
              .toLowerCase()
              .indexOf(state.lookUp.search.toLowerCase()) >= 0
          );
        }
      );

    // limit
    dispatch({
      type: EAction.MODIFY_PAGER_LENGTH,
      payload: _filteredListProduct.length,
    });

    setFilteredListProduct(_filteredListProduct);
  }, [state.lookUp, dispatch]);

  useEffect(() => {
    let start = state.pager.page * state.pager.limit;
    setListProduct(filteredListProduct.slice(start, start + state.pager.limit));
    setReady(true);
  }, [state.pager.limit, state.pager.page, filteredListProduct]);

  if (ready)
    if (listProduct.length)
      return (
        <>
          {
          alert ?
            <div className="b2c-alert">
              Welcome, this is an experimental application. The products are fake. So, make yourself at home.
            </div>
          : ''
          }

          <div className="b2c-list-product">
            {listProduct.map((product: IProduct) => {
              return (
                <div className="b2c-item" key={product.item.id}>
                  <Link to={`/product/${product.item.id}`}>
                    <div className="b2c-item-image">
                      <span className={`fa fa-${product.item.urlImage}`}></span>
                    </div>
                  </Link>
                  <div className="b2c-item-name">{product.item.name}</div>
                  <div className="b2c-item-type">{product.item.type}</div>
                  <ProductAdd product={product} />
                </div>
              );
            })}
          </div>
          <Pager />
        </>
      );
    else return <div className="b2c-no-results">Not found</div>;
  else return <div>Cargando...</div>;
};

export default ListProduct;
