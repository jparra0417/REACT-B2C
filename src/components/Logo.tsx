import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="no-text-decoration">
      <h1 className="b2c-logo">
        <span className="fa fa-globe" title="Shopping"></span>
        <div>Shop</div>
      </h1>
    </Link>
  );
};
export default Logo;
