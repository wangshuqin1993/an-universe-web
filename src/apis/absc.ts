// 导入 axios 实例
import httpRequest from "@/request";


export function apiAbscDraw(params) {
  return httpRequest({
    url: `/absc/draw`,
    method: "POST",
    data: params,
  });
}

export function apiAbscRecord(address: string) {
  return httpRequest({
    url: `/absc/draw/record`,
    method: "get",
    params: {address: address}
  });
}

export function apiAbscBlindBoxNumber() {
  return httpRequest({
    url: `/absc/blind_box/number`,
    method: "get",
  });
}


export function apiAbscBlindBoxById(id: string) {
  return httpRequest({
    url: `/absc/blind_box/${id}`,
    method: "get",
  });
}

// 活动进程接口
export function apiAbscDrawCheck() {
  return httpRequest({
    url: `/absc/draw/check`,
    method: "get",
  });
}

// 添加白名单接口

// 添加白名单获取时间
export function apiWhitelistAcquisitionTime()  {
  return httpRequest({
    url: `/absc/whitelist/acquisition/time`,
    method: "get",
  });
}

//获得用户 absc 的单个 NFT 信息
export function apiWhitelistAbscNFT(address: string)  {
  return httpRequest({
    url: `/absc/whitelist/abscnft`,
    method: "get",
    params: {address: address}
  });
}

// 白名单申请
export function apiWhitelistApplication(hash:string, tokenId: number, level:number, address: string)  {
  return httpRequest({
    url: `/absc/whitelist/application`,
    method: "post",
    data: {
      hash: hash,
      address: address,
      level:level,
      tokenId:tokenId,
    }  
  });
}

// 获得白名单验证
export function apiWhitelistVerify(address: string)  {
  return httpRequest({
    url: `/absc/whitelist/verify`,
    method: "get",
    params: {
      address: address,
    }
  });
}

// 添加白名单获取时间
export function apiWhitelistSubscribeTime()  {
  return httpRequest({
    url: `/absc/whitelist/subscribe/time`,
    method: "get",
  });
}

// 获得白名单折扣
export function apiWhitelistDiscount(address: string)  {
  return httpRequest({
    url: `/absc/whitelist/subscribe/discount`,
    method: "get",
    params: {
     address: address
    }
  });
}

// ABSC 的认购信息配置
export function apiWhitelistSubscribeConfig()  {
  return httpRequest({
    url: `/absc/whitelist/subscribe/config`,
    method: "get",
  });
}

// 通过 adress 返回已购买金额数
export function apiWhitelistSubscribeAmount(address: string)  {
  return httpRequest({
    url: `/absc/whitelist/subscribe`,
    method: "get",
    params: {
     address: address
    }
  });
}
// 白名单成员购买 参数 tx adress
export function apiWhitelistSubscribe(hash:string,address: string)  {
  return httpRequest({
    url: `/absc/whitelist/subscribe`,
    method: "post",
    data: {
      hash: hash,
      address: address
    }  
  });
}

// 获得 ido 开始时间，目标金额
export function apiIDOLaunchTime(stage:number)  {
  return httpRequest({
    url: `/absc/ido/time`,
    method: "get",
    params: {
      stage:stage
    }
  });
}
// /absc/ido/total/amount  GET   白名单ido总金额
export function apiIDOLaunchAmount()  {
  return httpRequest({
    url: `/absc/ido/total/amount`,
    method: "get",
    // params: {
    //   stage:stage
    // }
  });
}



// /absc/whitelist/qualification/check   GET  query参数:address   白名单资格校验
export function apiAbscQualificationCheck(address:string)  {
  return httpRequest({
    url: `/absc/whitelist/qualification/check`,
    method: "get",
    params: {
      address:address
    }
  });
}

// /absc/nft/equity/check   GET   query参数：address   nft权益资格交易案
export function apiNFTEquityCheck(address:string)  {
  return httpRequest({
    url: `/absc/nft/equity/check`,
    method: "get",
    params: {
      address:address
    }
  });
}

export function apiNFTEquitySubscribe(address:string, hash:string)  {
  return httpRequest({
    url: `/absc/nft/equity/subscribe`,
    method: "post",
    data: {
      address:address,
      hash: hash
    }
  });
}

// /absc/nft/equity/time   GET  nft权益活动时间
export function apiNFTEquityTime()  {
  return httpRequest({
    url: `/absc/nft/equity/time`,
    method: "get",
  });
}

// /absc/nft/equity/amount  GET   query参数：address     nft权益中查询地址已经购买的金额
export function apiNFTEquityAmount(address:string)  {
  return httpRequest({
    url: `/absc/nft/equity/amount`,
    method: "get",
    params: {
      address:address
    }
  });
}

// /absc/nft/equity/discount GET  query参数：address   返回值字符串
export function apiNFTEquityDiscount(address:string)  {
  return httpRequest({
    url: `/absc/nft/equity/discount`,
    method: "get",
    params: {
      address:address
    }
  });
}