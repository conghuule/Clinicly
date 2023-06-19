import config from '../config';
import Home from '../pages/Home';
import Medicines from '../pages/Medicines';
import MedicineDetail from '../pages/Medicines/MedicineDetail';
import Patients from '../pages/Patients';
import NewPatient from '../pages/Patients/NewPatient';
import PatientDetail from '../pages/Patients/PatientDetail';
import Bills from '../pages/Bills';
import BillDetail from '../pages/Bills/BillDetail';
import Staffs from '../pages/Manage/Staffs';
import StaffDetail from '../pages/Manage/Staffs/StaffDetail';
import Regulations from '../pages/Manage/Regulations';
import RegulationDetail from '../pages/Manage/Regulations/RegulationDetail';
const publicRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.patients, element: Patients },
  { path: config.routes.patient_new, element: NewPatient },
  { path: config.routes.patient_detail, element: PatientDetail },
  { path: config.routes.medicines, element: Medicines },
  { path: config.routes.medicine_detail, element: MedicineDetail },
  { path: config.routes.bills, element: Bills },
  { path: config.routes.bill_detail, element: BillDetail },
  { path: config.routes.staffs, element: Staffs },
  { path: config.routes.staff_detail, element: StaffDetail },
  { path: config.routes.regulations, element: Regulations },
  { path: config.routes.RegulationDetail, element: RegulationDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
