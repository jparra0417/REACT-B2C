import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import IProduct from "../interfaces/IProduct";
import { EStorage } from "../enums/EStorage";
import BreadCrumb from "./BreadCrumb";
import ProductAdd from "./ProductAdd";
import { Store } from "../Store";
import IState from "../interfaces/IState";
import UtilString from "../utils/UtilString";

const Product = () => {
  const { state } = useContext<IState | any>(Store);
  /**  params */
  let { id } = useParams();

  /** local */
  const [product, setProduct] = useState<IProduct>();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!ready)
      if (id && localStorage.getItem(EStorage.B2C_LIST_PRODUCT)) {
        const totalListProduct: IProduct[] = JSON.parse(
          localStorage.getItem(EStorage.B2C_LIST_PRODUCT)
        );
        let listProduct: IProduct[] = totalListProduct.filter(
          (product: IProduct) => {
            return product.item.id === id;
          }
        );
        if (listProduct && listProduct.length) setProduct(listProduct[0]);
        setReady(true);
      }
  }, [ready, id, state.lang]);

  if (ready)
    if (product)
      return (
        <div className="b2c-product-container">
          <div className="b2c-product">
            <BreadCrumb
              value={[
                { text: "Products", to: "/" },
                { text: product.item.name },
              ]}
            />
            <div className="b2c-product-wrapper">
              <div className="b2c-product-image">
                <span className={`fa fa-${product.item.urlImage}`}></span>
              </div>
              <div className="b2c-product-content">
                <div className="b2c-product-name">{product.item.name}</div>
                <div className="b2c-product-type">{product.item.type}</div>
                <div className="b2c-product-tax-value">
                  Tax : {UtilString.printNumber(product.item.taxValue, state.lang)}
                </div>                            
                <ProductAdd product={product} />
              </div>
            </div>
          </div>
        </div>
      );
    else return <Redirect to="/" />;
  else return <div>Cargando...</div>;
};

export default Product;
