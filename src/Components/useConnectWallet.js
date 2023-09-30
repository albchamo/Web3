import { useEffect, useState } from 'react';
import { useAccount } from './AccountContext';
import { ethereumClient } from '../config/WagmiConfig';
import Web3 from 'web3';
import { useWeb3Modal } from '@web3modal/react';  // Import useWeb3Modal from the library

export const useConnectWallet = () => {
    // Obtain the setAccountInfo method from the AccountContext
    const { setAccountInfo } = useAccount();
    // Obtain the open and clearCachedProvider methods from useWeb3Modal hook
    const { open, clearCachedProvider } = useWeb3Modal();
    // Create a state variable for the Web3 provider
    const [provider, setProvider] = useState(null);

    // Define an asynchronous function to handle wallet connection
    const connectWallet = async () => {
        try {
            await open();  // Open the Web3Modal to prompt user for wallet connection
            const web3 = new Web3(window.ethereum);  // Create a new Web3 instance with the provided Ethereum provider
            setProvider(web3);  // Set the Web3 provider in state
            const newAccountInfo = await ethereumClient.getAccount();  // Obtain account info using the ethereumClient
            setAccountInfo(newAccountInfo);  // Update the account info in the context
            window.dispatchEvent(new CustomEvent('walletConnectionChanged', { detail: newAccountInfo }));

            console.log('Connected:', newAccountInfo);  // Log the new account info
        } catch (error) {
            if (error === 'Modal closed by user') {
                clearCachedProvider();  // Clear the cached provider if the user closes the modal
                setAccountInfo(null);  // Reset the account info in the context
                window.dispatchEvent(new CustomEvent('walletConnectionChanged', { detail: null }));
                console.log('Wallet connection cancelled by user');  // Log the cancellation
            } else {
                console.error('Failed to connect wallet:', error);  // Log any other errors
            }
        }
    };

    // Define an asynchronous function to update account info
    const updateAccountInfo = async () => {
        try {
            const newAccountInfo = await ethereumClient.getAccount();  // Obtain updated account info
            setAccountInfo(newAccountInfo);  // Update the account info in the context
            console.log('Account info updated:', newAccountInfo);  // Log the updated account info
        } catch (error) {
            console.error('Failed to fetch account info:', error);  // Log any errors
            setAccountInfo(null);  // Reset the account info in the context
        }
    };

    

    useEffect(() => {
        const web3 = new Web3(window.ethereum);  // Create a new Web3 instance

        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                setAccountInfo(null);  // Reset the account info in the context
                console.log('No accounts connected');  // Log the disconnection
            } else {
                // Grab the account info again whenever accounts change
                updateAccountInfo();
            }
        };

        // Subscribe to accounts change event
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        console.log('Subscribed to accountsChanged event');  // Log the subscription

        return () => {
            // Unsubscribe from accounts change event on cleanup
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            console.log('Unsubscribed from accountsChanged event');  // Log the unsubscription
        };
    }, []);  // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

    return connectWallet;  // Return the connectWallet function for use in components
};
