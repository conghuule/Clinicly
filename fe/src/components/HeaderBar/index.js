import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Tooltip } from 'antd';

const HeaderBar = ({ title, icon, image, name, role }) => {
  return (
    <div className="flex justify-center items-center item h-[80px] w-[1000px] px-5 py-2">
      <div className="flex items-center gap-4 flex-1">
        <FontAwesomeIcon icon={icon} className="w-8 h-8 text-primary-200" />
        <h2 className="font-bold text-[28px]">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-3">
          <Tooltip
            title="Notifications"
            placement="bottom"
            className="p-[6px] rounded-[12px] shadow-md shadow-neutral-500/50 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBell} fontSize={20} className="w-[20px] text-primary-200" />
          </Tooltip>
          <Tooltip
            title="Dark mode"
            placement="bottom"
            className="p-[6px] rounded-[12px] shadow-md shadow-neutral-500/50 cursor-pointer"
          >
            <FontAwesomeIcon icon={faMoon} fontSize={20} className="w-[20px] text-blue" />
          </Tooltip>
        </div>
        <div className="flex gap-3">
          <Avatar size={48} src={image} className="cursor-pointer" />
          <div className="flex flex-col items-start justify-center">
            <h6 className="font-semibold">{name}</h6>
            <span>{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
