// opBNBmainnet
const opBNBmainnet = {
  chainId: 56,
  chainName: 'Binance Smart Chain Mainnet',
  explorerUrl: 'https://opbnbscan.com/',
};
// openBNBtestnet
const opBNBtestnet = {
  chainId: 97,
  chainName: 'Binance Smart Chain Testnet',
  explorerUrl: 'https://testnet.opbnbscan.com/',
};

export const config = import.meta.env.VITE_NETWORK === 'testnet' ? opBNBtestnet : opBNBmainnet;

export function getTransationUrl(hash: string) {
  return `${config.explorerUrl}tx/${hash}`;
} 

