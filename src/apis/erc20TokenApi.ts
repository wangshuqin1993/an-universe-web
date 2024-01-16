import { createContractApi } from './contractApi'
import { networkConfig, abis } from './contractConfig';
import { BigNumber, ethers } from 'ethers';
import { EIP1193Provider } from '@web3-onboard/core';

export class Erc20TokenApi {
  private contractApi;
  public contract;

  constructor(walletProvider: EIP1193Provider, network: string) {

    const provider = new ethers.providers.Web3Provider(walletProvider)

    const contractABI = abis.erc20Token;

    const contractAddress = this.getErc20Token(network)

    this.contractApi = createContractApi(contractAddress, contractABI, provider);

    this.contract = this.contractApi.getContract();
  }

  private getErc20Token(network: string): string {
    return networkConfig[network].erc20Token;
  }

  async transfer(to: string, value: BigNumber): Promise<any> {
    return this.contractApi.sendTransaction('transfer', to, value, {
      gasLimit: 100000,
    });
  }

  async balanceOf(owner: string): Promise<any> {
    return this.contractApi.query('balanceOf', owner);
  }
}
