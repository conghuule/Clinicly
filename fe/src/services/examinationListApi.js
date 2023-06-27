import { deleteAxios, get } from '../api/axiosClient';

const examinationListApi = {
  getAll: (params) => get('/ticket', { ...params, status: 2 }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
};

export default examinationListApi;
