import { get, put } from '../api/axiosClient';

const regulationAPI = {
  getALL: () => get('/regulation'),
  getByID: (id) => get(`/regulation?id=${id}`),
  update: (id, body) => put(`/regulation/${id}`, body),
};

export default regulationAPI;
