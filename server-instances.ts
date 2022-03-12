import axios from 'axios';

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

  return {
    post<T = any>({
      url,
      data,
      token,
      contentType = undefined,
    }: ServerPostArgs<T>) {
      return axiosCreate.post(url, data, {
        headers: token
          ? {
            'content-type': contentType,
            Authorization: 'Bearer ' + token,
          }
          : undefined,
      });
    },
    get<T = any>({
      url,
      params,
      token,
      contentType = undefined,
    }: ServerGetArgs<T>) {
      return axiosCreate.get(url, {
        headers: token
          ? {
            'content-type': contentType,
            Authorization: 'Bearer ' + token,
          }
          : undefined,
        params,
      });
    },
  };


}
