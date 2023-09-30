import React from 'react';
import { useWeb3Modal } from '@web3modal/react';

function LandingPage() {
  const { open } = useWeb3Modal();

  return (
    <div className="landing-page">
      <h1>Welcome to Phoros</h1>
      <p>Your gateway to an exclusive NFT experience.</p>
      <button onClick={open} className="connect-button">Connect Wallet</button>
      {/* Additional content, graphics, or features for your landing page can be added here. */}
    </div>
  );
}

export default LandingPage;
