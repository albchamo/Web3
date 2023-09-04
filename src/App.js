import React, { useState, useEffect } from 'react';
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import Navbar from './Components/Navbar';
import { wagmiConfig, ethereumClient, WagmiProvider, projectId } from './config/WagmiConfig';
import NFTList from './Components/NFTList';
import NFTIndicator from './Components/NFTIndicator';

function App() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const { isOpen } = useWeb3Modal();

  const fetchAccountInfo = async () => {
    const fetchedAccountInfo = await ethereumClient.getAccount();
    setAccountInfo(fetchedAccountInfo);
  };

  useEffect(() => {
    fetchAccountInfo();
  }, [isOpen]);  // Refetch account info when the modal's open state changes

  if (projectId === undefined || ethereumClient === undefined) {
    console.error("Critical values are undefined. Cannot proceed.");
    return <div>Error: Configuration is incomplete.</div>;
  }

  return (
    <>
      <WagmiProvider>
        <Navbar accountInfo={accountInfo} setAccountInfo={setAccountInfo} />
        <NFTList accountInfo={accountInfo} contractAddress="0xe3c783d9647d72f7f13ace64892630e7e33bc968" setParentNFTs={setNFTs} />
        <NFTIndicator nfts={nfts} />
      </WagmiProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
