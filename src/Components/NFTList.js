import React, { useEffect, useState } from 'react';
import { alchemy } from '../config/Alchemy';

const NFTList = ({ setParentNFTs, accountInfo, contractAddress }) => {
  const [nfts, setNFTs] = useState([]);
  const [error, setError] = useState(null);

  const fetchNFTs = async () => {
    try {
      const address = accountInfo?.address; // Extract the address property from the accountInfo object
      if (address) {
        const response = await alchemy.nft.getNftsForOwner(address, { contractAddresses: [contractAddress] });
        setNFTs(response.ownedNfts);
        setParentNFTs(response.ownedNfts); // Updating parent component state
      } else {
        // Clear NFTs if address is not available (i.e., user is disconnected)
        setNFTs([]);
        setParentNFTs([]); // Clearing NFTs in the parent component state
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [accountInfo, contractAddress]);

  if (error) {
    return <div>Error fetching NFTs: {error.message}</div>;
  }

  return null; // This will render nothing
};

export default NFTList;
