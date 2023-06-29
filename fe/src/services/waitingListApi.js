import { deleteAxios, post, get, put } from '../api/axiosClient';

const waitingListApi = {
  getAll: (params) => get('/ticket', { params }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
  post: (body) => post(`/ticket`, body),
  update: (id, body) => put(`/ticket/${id}`, body),
};

export default waitingListApi;
