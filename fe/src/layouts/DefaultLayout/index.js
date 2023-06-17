import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function DefaultLayout({ children }) {
  return (
    <div className="flex px-[16px]">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
