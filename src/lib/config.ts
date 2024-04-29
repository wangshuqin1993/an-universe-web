import exp from "constants";

// opBNBmainnet
const opBNBmainnet = {
  chainId: 56,
  chainName: 'Binance Smart Chain Mainnet',
  explorer: 'https://opbnbscan.com/',
};
// openBNBtestnet
const opBNBtestnet = {
  chainId: 97,
  chainName: 'Binance Smart Chain Testnet',
  explorer: 'https://testnet.opbnbscan.com/',
};

export const config = import.meta.env.VITE_NETWORK !== 'mainnet' ? opBNBtestnet : opBNBmainnet;

export function getTransationUrl(hash: string): string {
  return `${config.explorer}tx/${hash}`;
} 

