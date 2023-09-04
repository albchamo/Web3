import { useEffect, useState } from 'react';
import { alchemy } from '../config/Alchemy';

const TokenList = ({ setParentTokens, accountInfo }) => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  const fetchTokens = async () => {
    try {
      const address = accountInfo?.address;
      console.log("Account Info:", accountInfo);
      if (address) {
        const response = await alchemy.core.getTokensForOwner(address);
        console.log("Alchemy Response:", response);
        setTokens(response.tokens);
        setParentTokens(response.tokens); // Updating parent component state
        console.log("Tokens set:", response.tokens);
      } else {
        setTokens([]);
        setParentTokens([]); // Clearing tokens if user is disconnected
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching tokens:", error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [accountInfo]);

  if (error) {
    return <div>Error fetching tokens: {error.message}</div>;
  }

  return null; // This will render nothing
};

export default TokenList;
