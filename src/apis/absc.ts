// 导入axios实例
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