import { EIP1193Provider } from '@web3-onboard/core';
import { BigNumber,ethers } from 'ethers';
import { createContractApi } from './contractApi'
import { networkConfig, abis } from './contractConfig';
import * as internal from 'stream';

export class IDOApi {
  private contractApi;
  public contract;
  private provider

  constructor(walletProvider: EIP1193Provider, network: string) {

    this.provider = new ethers.providers.Web3Provider(walletProvider)

    const contractABI = abis.idoToken;

    const contractAddress = this.getIDO(network)

    this.contractApi = createContractApi(contractAddress, contractABI, this.provider);

    this.contract = this.contractApi.getContract();
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
    return this.contractApi.query('totalAmount',stage);
  }

  // res * tokenEthRate / 100
  async getTokensBalance(stage :number,address: string): Promise<any> {
    return this.contractApi.query('totalErc20Amount',stage,address);
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
      gasLimit: 100000,
    });
  }

  async claim(): Promise<any> {
    return this.contractApi.sendTransaction('claim', {
      gasLimit: 100000,
    });
  }
  
  async stage(): Promise<any> {
    return this.contractApi.query('stage');
  }
}
