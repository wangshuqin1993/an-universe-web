import { BigNumber, ethers } from 'ethers';
import { EIP1193Provider } from '@web3-onboard/core';

export class chainApi {
  private provider;

  constructor(walletProvider: EIP1193Provider) {
    this.provider = new ethers.providers.Web3Provider(walletProvider)
  }

  async transfer(address:string,value:string): Promise<any> {
    const signer = this.provider.getSigner();  
    let data = await signer.sendTransaction({
			to: address,
			value: ethers.utils.parseEther(value),
    })
    return new Promise<any>((resolve) => {
      resolve(data);
    });
  }

  async getBalance(address:string) {
    const signer = this.provider.getSigner();
    let balance = await this.provider.getBalance(address);
    return new Promise<any>((resolve) => {
      resolve(ethers.utils.formatEther(balance));
    });
  }
}