import { deleteAxios, get, put } from '../api/axiosClient';

const staffApi = {
  getStaffs: () => get('/staff'),
  getById: (id) => get(`/staff/${id}`),
  update: (id, body) => put(`/staff/${id}`, body),
  delete: (id) => deleteAxios(`/staff/${id}`),
};

export default staffApi;
