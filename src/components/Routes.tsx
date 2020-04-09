import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ListProduct from "./ListProduct";
import Product from "./Product";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListProduct} />
        <Route exact path="/product/:id" component={Product} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
