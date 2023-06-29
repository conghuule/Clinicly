import config from '../config';
import Home from '../pages/Home';
import Medicines from '../pages/Medicines';
import MedicineDetail from '../pages/Medicines/MedicineDetail';
import Patients from '../pages/Patients';
import PatientDetail from '../pages/Patients/PatientDetail';
import Invoices from '../pages/Invoices';
import InvoiceDetail from '../pages/Invoices/InvoiceDetail';
import Staffs from '../pages/Manage/Staffs';
import StaffDetail from '../pages/Manage/Staffs/StaffDetail';
import Regulations from '../pages/Manage/Regulations';
import RegulationDetail from '../pages/Manage/Regulations/RegulationDetail';
import WaitingList from '../pages/List/waitingList';
import ExaminationList from '../pages/List/examinationList';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import MedicalReport from '../pages/Patients/MedicalReport';
import CreateMedicalReport from '../pages/Patients/CreateMedicalReport';

const publicRoutes = [
  { path: config.routes.login, element: Login, layout: null },
  { path: config.routes.not_found, element: NotFound, layout: null },
];

const privateRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.patients, element: Patients },
  { path: config.routes.patient_detail, element: PatientDetail },
  { path: config.routes.medical_report, element: MedicalReport },
  { path: config.routes.create_medical_report, element: CreateMedicalReport },
  { path: config.routes.medicines, element: Medicines },
  { path: config.routes.medicine_detail, element: MedicineDetail },
  { path: config.routes.invoices, element: Invoices },
  { path: config.routes.invoice_detail, element: InvoiceDetail },
  { path: config.routes.staffs, element: Staffs },
  { path: config.routes.staff_detail, element: StaffDetail },
  { path: config.routes.regulations, element: Regulations },
  { path: config.routes.regulation_detail, element: RegulationDetail },
  { path: config.routes.waiting_list, element: WaitingList },
  { path: config.routes.examination_list, element: ExaminationList },
];

export { publicRoutes, privateRoutes };
