import { Contract, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers'
interface contractApi {
  query: (methodName: string, ...args: any[]) => Promise<any>;
  sendTransaction: (methodName: string, ...args: any[]) => Promise<any>;
  getContract: () => Contract;
  events: (eventName: string, fromBlock?: number, toBlock?: number, ...args: any[]) => Promise<any>
}


export function createContractApi(
  contractAddress: string,
  abi: any[],
  provider: ethers.providers.Web3Provider,
  jsonProvider:JsonRpcProvider
): contractApi {
  let transferContract
  try {
    const signer = provider.getSigner();
    transferContract = new Contract(contractAddress, abi, signer);
  } catch (error) {
    console.error(
      "not initialized signer"
    );
  }
  const queryContract = new Contract(contractAddress, abi, jsonProvider);

  const query = async (methodName: string, ...args: any[]): Promise<any> => {
    return await queryContract[methodName](...args);
  };

  const sendTransaction = async (methodName: string, ...args: any[]): Promise<any> => {
    const tx = await transferContract[methodName](...args);
    return tx.wait();
  };

  const getContract = () => {
    return queryContract;
  }

  const events = async (eventName: string, fromBlock?: number, toBlock?: number, ...args: any[]): Promise<any> => {
    const filter = queryContract.filters[eventName](...args);
    return queryContract.queryFilter(filter, fromBlock, toBlock);
  };

  return {
    query,
    sendTransaction,
    getContract,
    events
  };
}
