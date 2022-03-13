import axios, { AxiosRequestHeaders } from 'axios';

export interface ServerPostArgs<DataType> {
  url: string;
  token?: string;
  data?: DataType;
  contentType?: 'multipart/form-data';
}

export interface ServerGetArgs<DataType> {
  url: string;
  token?: string;
  params?: DataType;
  contentType?: 'multipart/form-data';
}

export const createAxiosInstances = (baseURL: string) => {
  const axiosCreate = axios.create({
    baseURL,
  });

  const createHeaders = (token?: string, contentType?: string) => {
    if (!token && !contentType) {
      return undefined;
    }
    const headers = {} as AxiosRequestHeaders;

    if (contentType) {
      headers['content-type'] = contentType;
    }

    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    return headers;
  };

  return {
    post<T = any>({ url, data, token, contentType }: ServerPostArgs<T>) {
      return axiosCreate.post(url, data, {
        headers: createHeaders(token, contentType),
      });
    },
    get<T = any>({ url, params, token, contentType }: ServerGetArgs<T>) {
      return axiosCreate.get(url, {
        headers: createHeaders(token, contentType),
        params,
      });
    },
  };
};
