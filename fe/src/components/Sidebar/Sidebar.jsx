import './Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
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
      </div>
    </div>
  );
};

export default Sidebar;
