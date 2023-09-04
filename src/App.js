import React, { useState, useEffect } from 'react';
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import Navbar from './Components/Navbar';
import { wagmiConfig, ethereumClient, WagmiProvider, projectId } from './config/WagmiConfig';
import NFTList from './Components/NFTList';
import NFTIndicator from './Components/NFTIndicator';
import TokenIndicator from './Components/TokenIndicator';
import TokenList from './Components/TokenList';
import TokenConfig from './config/TokenConfig';

function App() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const { isOpen } = useWeb3Modal();
  const [tokens, setTokens] = useState([]);
  const nftContractAddress = TokenConfig.nftContractAddress;

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
        <NFTList accountInfo={accountInfo} contractAddress= {nftContractAddress} setParentNFTs={setNFTs} />
        <TokenList accountInfo={accountInfo} setParentTokens={setTokens} />
        <TokenIndicator tokens={tokens}  />
        <NFTIndicator nfts={nfts} />
      </WagmiProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
