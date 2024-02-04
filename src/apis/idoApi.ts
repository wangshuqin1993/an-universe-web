import { EIP1193Provider } from '@web3-onboard/core';
import { BigNumber,ethers } from 'ethers';
import { createContractApi } from './contractApi'
import { networkConfig, abis } from './contractConfig';
import { JsonRpcProvider } from '@ethersproject/providers'
import * as internal from 'stream';

export class IDOApi {
  private contractApi;
  public contract;
  private provider;
  private queryContractApi;

  constructor(walletProvider: any, network: string) {
    if (walletProvider) {
      this.provider = new ethers.providers.Web3Provider(walletProvider)
    }

    const contractABI = abis.idoToken;

    const contractAddress = this.getIDO(network)

    this.contractApi = createContractApi(contractAddress, contractABI, this.provider,new JsonRpcProvider(networkConfig[network].url));
  }

  private getIDO(network: string): string {
    return networkConfig[network].idoToken;
  }

  public parseLog(log: { topics: Array<string>, data: string }) {
    return this.contract.interface.parseLog(log);
  }

  async getTokenEthRate(stage:number): Promise<any> {
    return this.contractApi.query('tokenEthRate',stage);
  }

  // whiteListAmount + totalAmount
  async getTotalAmount(stage): Promise<any> {
    const amount = await this.contractApi.query('totalAmount',stage);
    return new Promise<any>((resolve) => {
      resolve(ethers.utils.formatEther(amount));
    });
  }

  // res * tokenEthRate / 100
  async getTokensBalance(stage: number, address: string): Promise<any> {
    const balance = await this.contractApi.query('erc20Allocations', stage, address);
    return new Promise<any>((resolve) => {
      resolve(ethers.utils.formatEther(balance));
    });
  }

  async getMinAllocation(): Promise<any> {
    return this.contractApi.query('minAllocation');
  }
  
  async getMaxAllocation(): Promise<any> {
    return this.contractApi.query('maxAllocation');
  }

  async purchase(value:string): Promise<any> {
    return this.contractApi.sendTransaction('purchase', {
      value: ethers.utils.parseEther(value),
      gasLimit: 10000000,
    });
  }

  async claim(): Promise<any> {
    return this.contractApi.sendTransaction('claim', {
      gasLimit: 10000000,
    });
  }
  
  async stage(): Promise<any> {
    return this.contractApi.query('stage');
  }

  async withdraw(): Promise<any> {
    return this.contractApi.sendTransaction('withdraw', {
      gasLimit: 10000000,
    });
  }
}
