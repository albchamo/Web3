import React, { useEffect, useState } from 'react';
import { alchemy } from '../config/Alchemy';
import tokenConfig from '../config/TokenConfig.json';  // Import directly

const NFTList = ({ setParentNFTs, accountInfo }) => {
  const contractAddress = tokenConfig.nftContractAddress; // Renamed the variable to contractAddress
  const [nfts, setNFTs] = useState([]);
  const [error, setError] = useState(null);

  console.log('Contract Address:', contractAddress); // Log the contract address

  const fetchNFTs = async () => {
    try {
      const address = accountInfo?.address; // Extract the address property from the accountInfo object
      console.log('Address:', address); // Log the user's address

      if (address) {
        const response = await alchemy.nft.getNftsForOwner(address, { contractAddresses: [contractAddress] });
        
        console.log('Response:', response); // Log the entire response object
        console.log('Response NFTs:', response.ownedNfts); // Log the ownedNFTs array

        setNFTs(response.ownedNfts);
        setParentNFTs(response.ownedNfts); // Updating parent component state
      } else {
        // Clear NFTs if address is not available (i.e., user is disconnected)
        console.log('Address not available'); // Log if the address is not available
        setNFTs([]);
        setParentNFTs([]); // Clearing NFTs in the parent component state
      }
    } catch (error) {
      console.log('Error:', error); // Log if an error occurs
      setError(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [accountInfo, contractAddress]); // Now it's correctly named

  if (error) {
    return <div>Error fetching NFTs: {error.message}</div>;
  }

  return null; // This will render nothing
};

export default NFTList;
