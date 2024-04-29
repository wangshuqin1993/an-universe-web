import { request } from './request'

export function getFaucetBalance() {
  return request<number>('/bmaker/faucet/balance', {
    method: 'GET',
  })
}

export function getFaucetTransaction(data: { address: string }) {
  return request<{ traded: boolean; time: string; hash: string }>(`/bmaker/faucet/transaction?address=${data.address}`, {
    method: 'GET',
  })
}

export function claimFaucetToken(data: { address: string; respToken?: string }) {
  return request<string>('/bmaker/faucet/claim', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
