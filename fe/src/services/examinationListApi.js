import { deleteAxios, get, post, put } from '../api/axiosClient';

const examinationListApi = {
  getAll: (params) => get('/ticket', { params }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
  add: (body) => post(`/ticket`, body),
};

export default examinationListApi;
