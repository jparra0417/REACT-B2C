import React, { useContext, useEffect, useState } from "react";
import IState from "../interfaces/IState";
import { Store } from "../Store";
import UtilString from "../utils/UtilString";
import * as Faker from "faker";
import { EStorage } from "../enums/EStorage";
import { Link } from "react-router-dom";
import IProduct from "../interfaces/IProduct";
import ProductAdd from "./ProductAdd";

const ListProduct = (props) => {
  /** global */
  const { state } = useContext<IState | any>(Store);

  /** local */
  const [listProduct, setListProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    console.log("Change by lookup")
    /** function get total list Item */
    const getTotalListProduct = (): IProduct[] => {
      let listProduct: IProduct[] = [];
      if (!localStorage.getItem(EStorage.B2C_LIST_PRODUCT)) {
        for (let index = 0; index < 30; index++) {
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
              urlImage: Faker.image.imageUrl(),
            },
            taxValue: taxValue,
            totalValue: unitValue,
            unitValue: totalValue,
            amount: 1,
          };

          listProduct.push(product);
        }
        localStorage.setItem(
          EStorage.B2C_LIST_PRODUCT,
          JSON.stringify(listProduct)
        );
        return listProduct;
      }
      return JSON.parse(localStorage.getItem(EStorage.B2C_LIST_PRODUCT));
    };

    /** get total list item */
    const totalListProduct = getTotalListProduct();
    let listProduct: IProduct[] = totalListProduct;
    /** pipeline */
    if (state.lookUp.search.length)
      listProduct = listProduct.filter((product: IProduct) => {
        return (
          product.item.name
            .toLowerCase()
            .indexOf(state.lookUp.search.toLowerCase()) >= 0 ||
          product.item.type
            .toLowerCase()
            .indexOf(state.lookUp.search.toLowerCase()) >= 0
        );
      });
    setListProduct(listProduct);
  }, [state.lookUp, state.lang]);  

  return (
    <div className="b2c-list-item">
      {listProduct.length ? (
        listProduct.map((product: IProduct) => {
          return (
            <div className="b2c-product" key={product.item.id}>
              <div className="b2c-product-name">{product.item.name}</div>
              <div className="b2c-product-type">{product.item.type}</div>
              <div className="b2c-product-total-value">
                {product.item.totalValue.toLocaleString(state.lang)}
              </div>
              <ProductAdd product={product} />
              <Link to={`/product/${product.item.id}`}>Check</Link>
            </div>
          );
        })
      ) : (
        <div className="b2c-no-results">Not found</div>
      )}
    </div>
  );
};

export default ListProduct;
