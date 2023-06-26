import { get } from '../api/axiosClient';

const regulationAPI = {
  getRegulations: () => get('/regulation'),
  getRegulationDetail: (id) => get(`/regulation/${id}`),
};

export default regulationAPI;
