import React, { useEffect } from 'react';
import './TokenIndicator.css';
import tokenConfig from '../config/TokenConfig.json';  // Import directly


const TokenIndicator = ({ tokens}) => {
    const targetTokenAddress = tokenConfig.targetTokenAddress;

  useEffect(() => {
    console.log("Tokens in TokenIndicator: ", tokens);
  }, [tokens]);

  const hasTargetToken = tokens.some(token => {
    const normalizedTarget = targetTokenAddress.toLowerCase().trim();
    const normalizedTokenAddress = token.contractAddress.toLowerCase().trim();
    console.log("Comparing: ", normalizedTarget, " with ", normalizedTokenAddress);
    return normalizedTarget === normalizedTokenAddress;
  });

  console.log("Has Target Token: ", hasTargetToken);

  return (
    <div className={`token-indicator ${hasTargetToken ? 'has-token' : ''}`}></div>
  );
};

export default TokenIndicator;

