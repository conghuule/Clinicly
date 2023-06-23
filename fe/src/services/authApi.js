import { post } from '../api/axiosClient';

const authApi = {
  login: (email, password) => post('/auth/login', { email, password }),
};

export default authApi;
