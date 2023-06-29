const routes = {
  home: '/',
  login: '/login',
  logout: '/logout',
  patients: '/patients',
  patient_detail: '/patients/:id',
  medicines: '/medicines',
  medicine_detail: '/medicines/:id',
  invoices: '/invoices',
  invoice_detail: '/invoices/:id',
  staffs: '/manage',
  staff_detail: '/manage/staffs/:id',
  regulations: '/manage/regulations',
  regulation_detail: '/manage/regulations/:id',
  waiting_list: '/waiting_list',
  examination_list: '/examination_list',
  not_found: '*',
};

export default routes;
