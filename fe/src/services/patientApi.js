import { get, put } from '../api/axiosClient';

const patientApi = {
  getAll: () => get('/patient'),
  getById: (id) => get(`/patient/${id}`),
  update: (id, body) => put(`/patient/${id}`, body),
};

export default patientApi;
