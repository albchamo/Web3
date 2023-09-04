import React, { useEffect } from 'react';
import './NFTIndicator.css'; // Import the CSS file

const NFTIndicator = ({ nfts }) => {
  
  // Check if nfts is defined and has items
  const hasNFTs = nfts && nfts.length > 0;

  return (
    <div className={`nft-indicator ${hasNFTs ? 'has-nft' : ''}`}>
      {/* Your other code */}
    </div>
  );
};

export default NFTIndicator;