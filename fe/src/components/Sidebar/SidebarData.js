import IMAGES from '../assets/images/index.js';
import config from '../../config';
import {
  faChalkboardUser,
  faChartSimple,
  faFileInvoiceDollar,
  faHospitalUser,
  faPills,
  faRectangleList,
  faRightFromBracket,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    id: 1,
    title: 'Clinicly',
    path: config.routes.home,
    icon: <img src={IMAGES.logoClinicly} className="sidebar-logo-img" alt="dashboard" />,
    cName: 'nav-text',
  },
  {
    id: 2,
    title: 'Tổng quan',
    path: config.routes.home,
    icon: faChartSimple,
    cName: 'nav-text',
  },
  {
    id: 3,
    title: 'Danh sách đợi khám',
    path: config.routes.waiting_list,
    icon: faUserClock,
    cName: 'nav-text',
  },
  {
    id: 4,
    title: 'Danh sách khám',
    path: config.routes.examination_list,
    icon: faRectangleList,
    cName: 'nav-text',
  },
  {
    id: 5,
    title: 'Bệnh nhân',
    path: config.routes.patients,
    icon: faHospitalUser,
    cName: 'nav-text',
  },
  {
    id: 6,
    title: 'Kho thuốc',
    path: config.routes.medicines,
    icon: faPills,
    cName: 'nav-text',
  },
  {
    id: 7,
    title: 'Hoá đơn',
    path: config.routes.bills,
    icon: faFileInvoiceDollar,
    cName: 'nav-text',
  },
  {
    id: 8,
    title: 'Quản lý',
    path: config.routes.staffs,
    icon: faChalkboardUser,
    cName: 'nav-text',
  },
  {
    id: 9,
    title: 'Đăng xuất',
    path: config.routes.logout,
    icon: faRightFromBracket,
    cName: 'nav-text',
  },
];
