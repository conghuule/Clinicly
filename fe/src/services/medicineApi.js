import { get } from '../api/axiosClient';

const medicineApi = {
  getAll: () => get('/medicine'),
  getById: (id) => get(`/medicine/${id}`),
};

export default medicineApi;
