import React from "react";
import Search from './Search'
import ToggleCart from './ToggleCart'
// import Pager from "./Pager";
import Logo from "./Logo";


const Header = () => {   

    return (
        <div className="b2c-header">
            <Logo />
            <Search/>
            {/* <Pager /> */}
            <ToggleCart />            
        </div>
    )
}

export default Header


