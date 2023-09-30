import React from 'react';
import { useConnectWallet } from './useConnectWallet';
import './ConnectButton.css';
import { useAccount } from './AccountContext';  // Import the useAccount hook


const ConnectButton = () => {
  const { accountInfo } = useAccount();  // Get accountInfo from the context

    const connectWallet = useConnectWallet();

    const buttonText = accountInfo && accountInfo.address 
        ? `Connected: ${accountInfo.address.substring(0, 6)}...${accountInfo.address.substring(38)}`
        : "Connect with Wallet";

    return (
        <button onClick={connectWallet} className="connect-button">
            {buttonText}
        </button>
    );
};

export default ConnectButton;