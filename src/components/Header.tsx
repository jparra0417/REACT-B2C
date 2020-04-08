import React from "react";
import LookUp from './LookUp'
import ToggleCart from './ToggleCart'


const Header = () => {   

    return (
        <div className="b2c-header">
            <LookUp/>
            <ToggleCart />            
        </div>
    )
}

export default Header


