import { get, put } from '../api/axiosClient';

const invoiceAPI = {
  getInvoices: () => get('/invoice'),
  getInvoiceDetail: (id) => get(`/invoice/${id}`),
  update: (id, data) => put(`/invoice/${id}`, data),
};

export default invoiceAPI;
