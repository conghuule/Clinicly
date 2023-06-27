import { deleteAxios, get } from '../api/axiosClient';

const examinationListApi = {
  getAll: (params) => get('/ticket', { params }),
  delete: (id) => deleteAxios(`/ticket/${id}`),
};

export default examinationListApi;
