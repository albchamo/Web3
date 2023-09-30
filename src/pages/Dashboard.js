import React from 'react';
import NFTList from '../Components/NFTList';
import NFTIndicator from '../Components/NFTIndicator';
import TokenIndicator from '../Components/TokenIndicator';
import TokenList from '../Components/TokenList';
import { useAuth } from '../Components/AuthContext';
import{ useNFTs } from '../Components/NFTContext';

function Dashboard({nftContractAddress}) {
  const { accountInfo,  setNfts, tokens, setTokens } = useAuth();
  // I noticed you're passing `nftContractAddress` as a prop. 
  // If this is a constant value, you can directly import it here.
  // Otherwise, consider adding it to your context if it's dynamic or globally needed.
  const { nfts } = useNFTs();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your NFTs:</h2>
      <ul>
        {nfts.map((nft, index) => (
          <li key={index}>
            {nft.name} (Contract: {nft.contractAddress})
          </li>
        ))}
      </ul>
      <NFTList accountInfo={accountInfo} contractAddress={nftContractAddress} setParentNFTs={setNfts} />
      <TokenList accountInfo={accountInfo} setParentTokens={setTokens} />
      <TokenIndicator tokens={tokens} />
      <NFTIndicator nfts={nfts} />
    </div>
  );
}

export default Dashboard;

