import { EIP1193Provider } from '@web3-onboard/core';
import { BigNumber,ethers } from 'ethers';
import { createContractApi } from './contractApi'
import { networkConfig, abis } from './contractConfig';

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

  async getTokenEthRate(): Promise<any> {
    return this.contractApi.query('tokenEthRate');
  }

  // whiteListAmount + totalAmount
  async getTotalAmount(): Promise<any> {
    return this.contractApi.query('totalAmount');
  }

  // res * tokenEthRate / 100
  async getTokensBalance(address: string): Promise<any> {
    return this.contractApi.query('allocations',address);
  }

  async getMinAllocation(): Promise<any> {
    return this.contractApi.query('minAllocation');
  }
  
  async getMaxAllocation(): Promise<any> {
    return this.contractApi.query('maxAllocation');
  }

  async purchase(value:BigNumber): Promise<any> {
    return this.contractApi.sendTransaction('purchase', {
      value: value,
      gasLimit: 100000,
    });
  }

  async claim(): Promise<any> {
    return this.contractApi.sendTransaction('claim', {
      gasLimit: 100000,
    });
  }

}
