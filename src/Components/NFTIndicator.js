import React, { useEffect } from 'react';
import './NFTIndicator.css'; // Import the CSS file

const NFTIndicator = ({ nfts }) => {
  useEffect(() => {
    console.log("NFTs: ", nfts);
  }, [nfts]);

  const hasNFT = nfts.length > 0; // True if the user owns at least one NFT
  console.log("Has NFT: ", hasNFT);

  return (
    <div className={`nft-indicator ${hasNFT ? 'has-nft' : ''}`}></div>
  );
};

export default NFTIndicator;