import { get } from '../api/axiosClient';

const invoiceAPI = {
  getInvoices: () => get('/invoice'),
  getInvoiceDetail: (id) => get(`/invoice/${id}`),
};

export default invoiceAPI;
