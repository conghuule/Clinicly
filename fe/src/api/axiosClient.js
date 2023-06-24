import axios from 'axios';

const axiosClient = axios.create({
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

export const post = async (path, options = {}) => axiosClient.post(path, options);

export const put = async (path, options = {}) => axiosClient.put(path, options);

export const deleteAxios = async (path, options = {}) => axiosClient.delete(path, options);

export default axiosClient;
