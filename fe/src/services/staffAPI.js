import { deleteAxios, get, post, put } from '../api/axiosClient';

const staffApi = {
  getStaffs: () => get('/staff'),
  getById: (id) => get(`/staff/${id}`),
  getAll: (params) => get('/staff', { params }),
  getByID: (id) => get(`/staff/${id}`),
  add: (body) => post('/staff', body),
  update: (id, body) => put(`/staff/${id}`, body),
  delete: (id) => deleteAxios(`/staff/${id}`),
};

export default staffApi;
