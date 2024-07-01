import { API_URL } from 'app/config';
import { AxiosRequestConfig, Method } from 'axios';
import { Endpoints } from './endpoints';
import { Request } from './services';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export type RequestOptions = AxiosRequestConfig & {
  urlParams?: object;
};

const gen = (params: string, baseURL = API_URL) => {
  let url = params;
  let method: Method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0] as Method;
    url = paramsArray?.[1];
  }

  return function (data: any, options: RequestOptions = {}) {
    return Request(url, {
      data: method === 'GET' ? null : data,
      method,
      ...options,
      params: options?.params ? options?.params : method === 'GET' ? data : null,
      baseURL,
    });
  };
};

type APIMap = {
  [key in keyof typeof Endpoints]: <T>(data?: any, option?: RequestOptions) => Promise<ApiResponse<T>>;
};

const Api = {};
for (const key in Endpoints) {
  // @ts-ignore
  Api[key] = gen(Endpoints[key] as string);
}

export default Api as APIMap;
