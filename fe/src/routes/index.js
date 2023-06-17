import config from '../config';
import Home from '../pages/Home';
import Medicines from '../pages/Medicines';
import MedicineDetail from '../pages/Medicines/MedicineDetail';
import Patients from '../pages/Patients';
import NewPatient from '../pages/Patients/NewPatient';
import PatientDetail from '../pages/Patients/PatientDetail';

const publicRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.patients, element: Patients },
  { path: config.routes.patient_new, element: NewPatient },
  { path: config.routes.patient_detail, element: PatientDetail },
  { path: config.routes.medicines, element: Medicines },
  { path: config.routes.medicine_detail, element: MedicineDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
