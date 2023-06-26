import { post } from '../api/axiosClient';

const medicineApi = {
  add: (body) => post(`/medicine-report`, body),
};

export default medicineApi;
