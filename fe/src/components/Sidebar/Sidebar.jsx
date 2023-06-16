import './Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="sidebar">
      <Link className="sidebar-logo">
        <div className="sidebar-logo-icon">{SidebarData[0].icon}</div>
        <div className="sidebar-logo-title">{SidebarData[0].title}</div>
      </Link>
      <div className="sidebar-items">
        {SidebarData.slice(1).map((item, index) => {
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-link ${selectedItem === item.id ? 'selected' : ''}`}
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="sidebar-icon">{item.icon}</div>
              <div className="sidebar-title">{item.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
