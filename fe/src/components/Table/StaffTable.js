import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STAFF_COLUMNS } from '../../utils/constants';

export default function StaffTable({ searchValue }) {
  const navigate = useNavigate();

  // TODO: replace with api response
  const staffs = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      id: index,
      name: 'Staff ' + index,
      date_of_birth: 12,
      address: 'Address ' + index,
      phone_number: '123',
      type: 'Bác sĩ',
      actions: ['Sửa', 'Xoá'],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <Table
      dataSource={staffs}
      columns={STAFF_COLUMNS}
      onRow={(record) => ({
        onClick: () => navigate(record.id.toString()),
      })}
    />
  );
}
