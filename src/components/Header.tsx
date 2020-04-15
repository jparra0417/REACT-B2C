import React from "react";
import Search from "./Search";
import ToggleCart from "./ToggleCart";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";
import Title from "./Title";

const Header = () => {
  const location = useLocation();
  return (
    <div className="b2c-header">
      <Logo />
      {location.pathname === "/" ? (
        <Search />
      ) : (
        <Title path={location.pathname} />
      )}
      <ToggleCart />
    </div>
  );
};

export default Header;
