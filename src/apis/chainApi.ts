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

  async getBalance(address: string) {
    console.log('getBalance', this.provider);
    const signer = this.provider.getSigner();
    let balance = await this.provider.getBalance(address);
    return new Promise<any>((resolve) => {
      resolve(ethers.utils.formatEther(balance));
    });
  }

  async getTransactionErrorInfo(txHash) {
    try {
      const transactionReceipt = await this.provider.getTransactionReceipt(txHash);
      const revertReason = ethers.utils.toUtf8String(
        ethers.utils.arrayify(transactionReceipt.logs[0].data)
      );
      console.error('Transaction failed with reason:', revertReason);
      return revertReason;
    } catch (error) {
      console.error('Error retrieving transaction information:', error.message);
      return 'Error retrieving transaction information';
    }
  }
}