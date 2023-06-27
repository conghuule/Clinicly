import './Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link, NavLink } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmLogoutModal from '../Modal/ConfirmLogoutModal';
import { AuthContext } from '../../context/authContext';

const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false);
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.setAuth(null);
    localStorage.setItem('auth_data', JSON.stringify(null));
    setOpenModal(false);
  };

  return (
    <div className="sidebar h-screen sticky top-0">
      <Link className="sidebar-logo" to={config.routes.home}>
        <div className="sidebar-logo-icon">{SidebarData[0].icon}</div>
        <div className="sidebar-logo-title">{SidebarData[0].title}</div>
      </Link>
      <div className="sidebar-items">
        {SidebarData.slice(1, -1).map((item) => {
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-link selected text-primary-300'
                  : 'sidebar-link text-primary-100 hover:text-primary-300'
              }
            >
              <FontAwesomeIcon icon={item.icon} className="w-[24px] h-[24px] pr-[16px]" />
              <div className="sidebar-title">{item.title}</div>
            </NavLink>
          );
        })}
        <span
          className="sidebar-link text-primary-100 hover:text-primary-300 hover:cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={SidebarData.at(-1).icon} className="w-[24px] h-[24px] pr-[16px]" />
          <div className="sidebar-title">{SidebarData.at(-1).title}</div>
        </span>
        <ConfirmLogoutModal open={openModal} onCancel={() => setOpenModal(false)} onOk={handleLogout} />
      </div>
    </div>
  );
};

export default Sidebar;
