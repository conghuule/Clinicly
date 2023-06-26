import { deleteAxios, get, put } from '../api/axiosClient';

const patientApi = {
  getAll: (params) => get('/patient', { params }),
  getById: (id) => get(`/patient/${id}`),
  update: (id, body) => put(`/patient/${id}`, body),
  delete: (id) => deleteAxios(`/patient/${id}`),
};

export default patientApi;
