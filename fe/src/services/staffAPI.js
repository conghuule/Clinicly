import { deleteAxios, get, post, put } from '../api/axiosClient';

const invoiceAPI = {
  getAll: (params) => get('/staff', { params }),
  getByID: (id) => get(`/staff/${id}`),
  add: (body) => post('/staff', body),
  update: (id, body) => put(`/staff/${id}`, body),
  delete: (id) => deleteAxios(`/staff/${id}`),
};

export default invoiceAPI;
