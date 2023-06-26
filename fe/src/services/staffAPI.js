import { get } from '../api/axiosClient';

const invoiceAPI = {
  getStaffs: () => get('/staff'),
  getStaffDetail: (id) => get(`/staff/${id}`),
};

export default invoiceAPI;
