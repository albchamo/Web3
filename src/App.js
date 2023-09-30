import React, { useEffect, useState } from 'react';
import { Web3Modal } from '@web3modal/react';
import Navbar from './Components/Navbar';
import { wagmiConfig, ethereumClient, WagmiProvider, projectId } from './config/WagmiConfig';
import NFTList from './Components/NFTList';
import NFTIndicator from './Components/NFTIndicator';
import TokenIndicator from './Components/TokenIndicator';
import TokenList from './Components/TokenList';
import TokenConfig from './config/TokenConfig';
import { AccountProvider, useAccount } from './Components/AccountContext';  // Import Account context provider and hook
import { useWeb3Modal } from '@web3modal/react';

function App() {
  const { accountInfo, setAccountInfo } = useAccount();  // Get accountInfo and setAccountInfo from the context
  const [nfts, setNFTs] = useState([]);
  const [tokens, setTokens] = useState([]);
  const nftContractAddress = TokenConfig.nftContractAddress;
  const { isOpen } = useWeb3Modal();
  useEffect(() => {
    const handleWalletConnectionChanged = (event) => {
        setAccountInfo(event.detail);
    };

    window.addEventListener('walletConnectionChanged', handleWalletConnectionChanged);

    return () => {
        window.removeEventListener('walletConnectionChanged', handleWalletConnectionChanged);
    };
}, [setAccountInfo]);

  // Early exit if critical configuration values are undefined
  if (projectId === undefined || ethereumClient === undefined) {
    console.error("Critical values are undefined. Cannot proceed.");
    return <div>Error: Configuration is incomplete.</div>;
  }

  

  return (
    <WagmiProvider>
      {/* Pass accountInfo and setAccountInfo to Navbar as props */}
      <Navbar accountInfo={accountInfo} setAccountInfo={setAccountInfo} /> 
      <NFTList accountInfo={accountInfo} contractAddress={nftContractAddress} setParentNFTs={setNFTs} />
      <TokenList accountInfo={accountInfo} setParentTokens={setTokens} />
      <TokenIndicator tokens={tokens} />
      <NFTIndicator nfts={nfts} />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiProvider>
  );
}

// Wrap App component with AccountProvider to provide context to the app
const WrappedApp = () => (
  <AccountProvider>
    <App />
  </AccountProvider>
);

export default WrappedApp;  // Export WrappedApp instead of App
