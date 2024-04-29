export interface RequestOptions {
  baseURL?: string
  timeout?: number
}
export interface IResult<T> {
  code: number;
  data: T;
  message: string;
}

export function createRequest(options: RequestOptions) {
  return async function request<T>(input: string, init: RequestInit) {
    const url = options.baseURL ? `${options.baseURL}${input}` : input;

    // timeout
    const timeout = options.timeout || 30000;
    const controller = new AbortController();
    setTimeout(() => {
      controller.abort('request timeout.');
    }, timeout);
    init.signal = controller.signal;

    const response = await fetch(url, init)
    if (!response.ok) {
      try {
        const data = await response.json() as IResult<T>;
        throw new Error(data.message)
      } catch (error) {
        throw new Error(error.message || response.statusText)
      }
    }
    const data = await response.json() as IResult<T>;
    if (data.code !== 200) {
      throw new Error(data.message)
    }
    return data.data;
  }
}

export const request = createRequest({
  baseURL: '/api'
})