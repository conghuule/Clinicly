const routes = {
  home: '/',
  login: '/login',
  logout: '/logout',
  patients: '/patients',
  patient_detail: '/patients/:id',
  medical_report: '/patients/:id/medical_report/:medical_report_id',
  create_medical_report: '/patients/:id/create_medical_report',
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
