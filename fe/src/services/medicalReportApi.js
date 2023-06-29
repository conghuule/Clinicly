import { get, post } from '../api/axiosClient';

const medicalReportAPI = {
  createMedicalReport: (data) => post('/medical-report', data),
  getMedicalReportDetail: (id) => get(`/medical-report/${id}`),
};

export default medicalReportAPI;
