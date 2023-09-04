import React from 'react';
import { configureChains, createConfig, WagmiConfig, mainnet } from 'wagmi';
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { EthereumClient } from '@web3modal/ethereum'; // Import EthereumClient

const chains = [mainnet];
const projectId = '3dd60652fc7a9a7934ec143211b92364'; // Replace with your actual project ID

console.log('Project ID:', projectId); // Debugging line

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

console.log('Wagmi Config:', wagmiConfig); // Debugging line

const ethereumClient = new EthereumClient(wagmiConfig, chains);

console.log('Ethereum Client:', ethereumClient); // Debugging line

export const WagmiProvider = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export { wagmiConfig, ethereumClient, projectId }; // Export projectId

