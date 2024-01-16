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
  // return httpRequest({
  //   url: `/absc/whitelist/acquisition/time`,
  //   method: "get",
  // });
  return Promise.resolve({
    code: 200,
    data: {
      start: "2024-1-13 00:00:00",
      end: "2024-1-14 00:00:00",
      status: '2'
    }
  })
}

//获得用户 absc 的单个 NFT 信息
export function apiWhitelistAbscNFT(address: string)  {
  // return httpRequest({
  //   url: `/absc/whitelist/abscnft`,
  //   method: "get",
  //   params: {address: address}
  // });
  return Promise.resolve({
    code: 200,
    data: {
      tokenId: 1,
      level: 2
    }
  })
}

// 白名单申请
export function apiWhitelistApplication(tx:string, aptoAddress: string, address: string)  {
  // return httpRequest({
  //   url: `/absc/whitelist/application`,
  //   method: "post",
  //   params: {
  //     tx: "tx",
  //   address: "address"
  // }  
  // });
  return Promise.resolve({
    code: 200,
    data: {
      result: true
    }
  })
}

// 获得白名单验证
export function apiWhitelistVerify(address: string)  {
  // return httpRequest({
  //   url: `/absc/whitelist/verify`,
  //   method: "get",
  //   params: {
  //   address: "address"
  //   }
  // });
  return Promise.resolve({
    code: 200,
    data: {
      result: true,
      tokenId: 1,
      level: 2
    }
  })
}

// 添加白名单获取时间
export function apiWhitelistSubscribeTime()  {
  // return httpRequest({
  //   url: `/absc/whitelist/subscribe/time`,
  //   method: "get",
  // });
  return Promise.resolve({
    code: 200,
    data: {
      start: "2024-1-13 00:00:00",
      end: "2024-1-14 00:00:00",
      status: '2'
    }
  })
}

// 获得白名单折扣
export function apiWhitelistDiscount(address: string)  {
  // return httpRequest({
  //   url: `/absc/whitelist/subscribe/discount`,
  //   method: "get",
  //   params: {
  //    address: "address"
  //   }
  // });
  return Promise.resolve({
    code: 200,
    data: {
      discount: "0.7"
    }
  })
}

// ABSC 的认购信息配置
export function apiWhitelistSubscribeConfig()  {
  // return httpRequest({
  //   url: `/absc/whitelist/subscribe/config`,
  //   method: "get",
  // });
  return Promise.resolve({
    code: 200,
    data: {
      tokenEthRate: "0.7",
      maxAllocation: "100",
      minAllocation: "1"
    }
  })
}

// 通过 adress 返回已购买金额数
export function apiWhitelistSubscribeAmount(address: string)  {
  // return httpRequest({
  //   url: `/absc/whitelist/subscribe`,
  //   method: "get",
  //   params: {
  //    address: "address"
  //   }
  // });
  return Promise.resolve({
    code: 200,
    data: {
      amount: "10",
      abscAmount: '776555'
    }
  })
}
// 白名单成员购买 参数 tx adress
export function apiWhitelistSubscribe(tx:string,address: string)  {
  // return httpRequest({
  //   url: `/absc/whitelist/subscribe`,
  //   method: "post",
  //   params: {
  //     tx: "tx",
  //   address: "address"
  // }  
  // });
  return Promise.resolve({
    code: 200,
    data: {
      result: true
    }
  })
}

// 获得 ido 开始时间，目标金额
export function apiIDOLaunchTime()  {
  // return httpRequest({
  //   url: `/absc/ido/time`,
  //   method: "get",
  // });
  return Promise.resolve({
    code: 200,
    data: {
      start: "2024-1-13 00:00:00",
      status: '2',
      targetAmount: "5000",
      whitelistAmount:"1000",
    }
  })
}

