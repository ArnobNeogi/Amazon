import React from 'react';
import './Header.css';
import log from '../../images/amazon-png-logo-vector-6701.png';



const Header = () => {
    return (
        <div className="header">
            <img className='logo' src={log} alt="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/orders">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                </nav>
            
           
        </div>
    );
};

export default Header;