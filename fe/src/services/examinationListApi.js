import { deleteAxios, get, post } from '../api/axiosClient';

const examinationListApi = {
  getAll: (params) => get('/ticket', { params }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
  post: (body) => post(`/ticket`, body),
};

export default examinationListApi;
