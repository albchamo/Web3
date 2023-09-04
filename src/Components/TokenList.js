import React, { useEffect, useState } from 'react';
import { alchemy } from '../config/Alchemy'; // Import the alchemy instance

const TokenList = ({ accountInfo }) => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchErc20Tokens = async () => {
      try {
        if (accountInfo) {
          const accountInfoResponse = await accountInfo; // Await the account info
          const address = accountInfoResponse.address; // Extract the address from the account info
          const response = await alchemy.core.getTokensForOwner(address);
          setTokens(response.tokens);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchErc20Tokens();
  }, [accountInfo]);

  if (error) {
    return <div>Error fetching ERC-20 tokens: {error.message}</div>;
  }

  return (
    <div>
      <h2>ERC-20 Tokens</h2>
      {tokens.map((token, index) => (
        <div key={index}>
          <p>Contract Address: {token.contractAddress}</p>
          <p>Balance: {token.balance}</p>
          <p>Decimals: {token.decimals}</p>
          <p>Name: {token.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
