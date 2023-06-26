import axios from 'axios';
import config from '../config';

const axiosClient = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

export const get = async (path, options = {}) => axiosClient.get(path, options);

export const post = async (path, data, options = {}) => axiosClient.post(path, data, options);

export const put = async (path, data, options = {}) => axiosClient.put(path, data, options);

export const deleteAxios = async (path, options = {}) => axiosClient.delete(path, options);

export default axiosClient;
