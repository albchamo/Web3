import React from 'react';
import ConnectButton from './ConnectButton';

const Navbar = ({ accountInfo, setAccountInfo }) => {
  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
          <ConnectButton accountInfo={accountInfo} setAccountInfo={setAccountInfo} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
