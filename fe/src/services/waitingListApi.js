import { deleteAxios, get } from '../api/axiosClient';

const waitingListApi = {
  getAll: (params) => get('/ticket', { ...params, status: 1 }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
};

export default waitingListApi;
