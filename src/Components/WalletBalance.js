import React, { useEffect, useState } from 'react';
import { ethereumClient } from '../config/WagmiConfig';

const WalletBalance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const accountInfo = await ethereumClient.getAccount(); // Await the address
        const address = accountInfo.address; // Extract the address string from the object
        if (typeof address === 'string') {
          const fetchedBalance = await ethereumClient.fetchBalance({ address, chainId: 1 }); // Use the awaited address
          setBalance(fetchedBalance);
        } else {
          console.error('Address is not a string:', address);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      {balance ? (
        <div>
          <h2>Connected Wallet Balance:</h2>
          <p>{`${balance.formatted} ${balance.symbol}`}</p> {/* Render formatted balance and symbol */}
        </div>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default WalletBalance;
