import React from 'react';
import WalletBalance from '../Components/WalletBalance';

const HomePage = ({ accountInfo}) => {
  return (
    <div>
      <h1>HomePage</h1>
      <WalletBalance accountInfo={accountInfo} />
    </div>
  );
};

export default HomePage;