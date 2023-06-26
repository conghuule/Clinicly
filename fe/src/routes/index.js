import config from '../config';
import Home from '../pages/Home';
import Medicines from '../pages/Medicines';
import MedicineDetail from '../pages/Medicines/MedicineDetail';
import Patients from '../pages/Patients';
import PatientDetail from '../pages/Patients/PatientDetail';
import Bills from '../pages/Bills';
import BillDetail from '../pages/Bills/BillDetail';
import Staffs from '../pages/Manage/Staffs';
import StaffDetail from '../pages/Manage/Staffs/StaffDetail';
import Regulations from '../pages/Manage/Regulations';
import RegulationDetail from '../pages/Manage/Regulations/RegulationDetail';
import WaitingList from '../pages/List/waitingList';
import ExaminationList from '../pages/List/examinationList';
import Logout from '../pages/Logout';
import Login from '../pages/Login';

const publicRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.patients, element: Patients },
  { path: config.routes.patient_detail, element: PatientDetail },
  { path: config.routes.medicines, element: Medicines },
  { path: config.routes.medicine_detail, element: MedicineDetail },
  { path: config.routes.bills, element: Bills },
  { path: config.routes.bill_detail, element: BillDetail },
  { path: config.routes.staffs, element: Staffs },
  { path: config.routes.staff_detail, element: StaffDetail },
  { path: config.routes.regulations, element: Regulations },
  { path: config.routes.regulation_detail, element: RegulationDetail },
  { path: config.routes.waiting_list, element: WaitingList },
  { path: config.routes.examination_list, element: ExaminationList },
  { path: config.routes.login, element: Login, layout: null },
  { path: config.routes.logout, element: Logout, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
