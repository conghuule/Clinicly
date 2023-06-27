import { deleteAxios, post, get } from '../api/axiosClient';

const waitingListApi = {
  getAll: (params) => get('/ticket', { params }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
  post: (body) => post(`/ticket`, body),
};

export default waitingListApi;
