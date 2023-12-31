import { get, post, put, deleteAxios } from '../api/axiosClient';

const patientApi = {
  getAll: (params) => get('/patient', { params }),
  getById: (id) => get(`/patient/${id}`),
  update: (id, body) => put(`/patient/${id}`, body),
  delete: (id) => deleteAxios(`/patient/${id}`),
  add: (body) => post(`/patient`, body),
  getHistory: (params) => get(`/medical-report`, { params }),
  deleteHistory: (id) => deleteAxios(`/medical-report/${id}`),
};

export default patientApi;
