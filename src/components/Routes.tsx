import React from "react";
import { Switch, Route } from "react-router-dom";
import ListProduct from "./ListProduct";
import Product from "./Product";
import Cart from "./Cart";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ListProduct} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/cart" component={Cart} />
    </Switch>
  );
};

export default Routes;
