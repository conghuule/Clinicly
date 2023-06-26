import { get } from '../api/axiosClient';

const dashboardApi = {
  getAll: (params) => get('/dashboard', { params }),
};

export default dashboardApi;
