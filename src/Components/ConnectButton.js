import React from 'react';
import { useWeb3Modal } from '@web3modal/react';
import './ConnectButton.css';
import {  ethereumClient, } from '../config/WagmiConfig';


const ConnectButton = ({ accountInfo, setAccountInfo }) => {
  const { open, close } = useWeb3Modal();

  const handleClick = async () => {
    await open();
    // Update account info here
    const newAccountInfo = await ethereumClient.getAccount(); // Replace with your actual method
    setAccountInfo(newAccountInfo);
  };

  const buttonText = accountInfo && accountInfo.address 
  ? `Connected: ${accountInfo.address.substring(0, 6)}...${accountInfo.address.substring(38)}`
  : "Connect with Wallet";

return (
  <button onClick={handleClick} className="connect-button">
    {buttonText}
  </button>
);
};

export default ConnectButton;