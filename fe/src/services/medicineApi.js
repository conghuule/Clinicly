import { deleteAxios, get, post, put } from '../api/axiosClient';

const medicineApi = {
  getAll: (params) => get('/medicine', { params }),
  getById: (id) => get(`/medicine/${id}`),
  update: (id, body) => put(`/medicine/${id}`, body),
  add: (body) => post(`/medicine`, body),
  delete: (id) => deleteAxios(`/medicine/${id}`),
};

export default medicineApi;
