import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function DefaultLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1  px-[16px]">{children}</div>
    </div>
  );
}
