import { API_URL } from 'app/config';
import { DEFAULT_PAGINATION_DATA } from 'app/constants';
import axios, { AxiosResponse } from 'axios';
import { isArray, isNil } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { compile } from 'path-to-regexp';
import qs from 'qs';
import { PaginationResponse } from 'shared/types';
import { RequestOptions } from './api';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const codeMessage = {
  400: 'There was an error in the request, and the server did not create or modify data.',
  401: 'The user does not have permissions.',
  403: 'The user is authorized, but access is prohibited.',
  404: 'The request was made for a record that does not exist, and the server did not perform an operation.',
  422: 'When creating an object, a validation error occurred.',
  500: 'A server error occurred. Please check the server.',
  502: 'Gateway error.',
  503: 'Services are unavailable and the server is temporarily overloaded or maintained.',
  504: 'Gateway timed out.',
};

export const Request = async (url: string, options: RequestOptions) => {
  const {
    data,
    baseURL = API_URL,
    headers = { 'Content-Type': 'application/json' },
    method,
    params,
    urlParams,
  } = options;

  const value = method === 'GET' ? params : data;
  let cloneData;
  if (data instanceof FormData) {
    cloneData = data;
  } else {
    cloneData = cloneDeep(value);
  }

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    url = compile(url)(urlParams);

    url = domain + url;
  } catch (e) {
    console.log({ e });
    //Show error
  }

  options.headers = headers;
  options.url = url;

  if (method === 'GET') {
    options.params = cloneData;
    options.data = undefined;
  } else {
    options.data = cloneData;
    options.params = params;
  }
  options.baseURL = baseURL;

  options.paramsSerializer = function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  };

  return axios(options)
    .then((response: AxiosResponse<any>) => {
      if (!response?.data?.success) {
        return Promise.reject({
          success: false,
          message: response?.data?.error ?? 'Request failed',
          statusCode: 400,
          data: response?.data,
        });
      }
      const { statusText, status, data } = response;

      let result: { [key: string]: any; pagination?: Omit<PaginationResponse, 'success'> } = {};
      if (isArray(data?.data)) {
        result.data = data?.data;
      } else if (typeof data?.data === 'object') {
        result = data?.data;
      } else {
        result = data;
      }

      if (!isNil(data?.totalItems)) {
        result.pagination = {
          totalItems: data?.totalItems ?? DEFAULT_PAGINATION_DATA.totalItems,
          totalPages: data?.totalPages ?? DEFAULT_PAGINATION_DATA.totalPages,
          hasNextPage: data?.hasNextPage ?? DEFAULT_PAGINATION_DATA.hasNextPage,
          pageNumber: data?.pageNumber ?? DEFAULT_PAGINATION_DATA.pageNumber,
          pageSize: data?.pageSize ?? DEFAULT_PAGINATION_DATA.pageSize,
        };
      }

      const res = {
        success: true,
        message: statusText,
        statusCode: status,
        data: result,
      };

      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log({ error });
      const { response, message } = error;
      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;

        // @ts-ignore
        msg = data.message || codeMessage[statusCode] || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      if (statusCode === 401 || statusCode === 403) {
        // Handle logout
        // store?.dispatch(authActions.logout());
      }

      if (statusCode === 403) {
        // history.push("/403");
      }
      if (statusCode <= 504 && statusCode >= 500) {
        // history.push("/500");
      }
      if (statusCode >= 404 && statusCode < 422) {
        // history.push("/404");
      }

      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
        errors: response?.data?.errors,
      });
    });
};

axios.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.token;
    if (config.headers && typeof token === 'string' && token !== '') {
      // config.headers.Authorization = `Bearer ${token}`
      config.headers['x-access-token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
