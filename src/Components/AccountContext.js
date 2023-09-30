// Import necessary React hooks and createContext function.
import React, { createContext, useState, useContext } from "react";

// Create a new context with a null default value.
const AccountContext = createContext(null);

// Define a provider component for the AccountContext.
export const AccountProvider = ({ children }) => {
  // Create a state variable and setter function for account information.
  const [accountInfo, setAccountInfo] = useState(null);

  console.log("AccountProvider - accountInfo:", accountInfo); // Log the current value of accountInfo whenever it changes.

  return (
    // Return a provider that makes the accountInfo and setAccountInfo
    // available to any nested components.
    <AccountContext.Provider value={{ accountInfo, setAccountInfo }}>
      {children}  {/* Render any nested components. */}
    </AccountContext.Provider>
  );
};

// Define a custom hook that provides a convenient way for
// components to access the account context.
export const useAccount = () => {
  const contextValue = useContext(AccountContext);
  
  console.log("useAccount - contextValue:", contextValue); // Log the value obtained from useContext whenever useAccount is called.

  return contextValue;
};
