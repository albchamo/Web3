import { Network, Alchemy } from 'alchemy-sdk';

export const settings = {
  apiKey: 'zgwBcDBkt85oI8KrRaVge82MrP4ER9on',
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);