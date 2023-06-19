import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { REGULATION_COLUMNS } from '../../utils/constants';

export default function RegulationTable({ searchValue }) {
  const navigate = useNavigate();

  // TODO: replace with api response
  const regulations = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      id: index,
      name: 'Quy định ' + index,
      value: index * 2,
      actions: ['Sửa'],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <Table
      dataSource={regulations}
      columns={REGULATION_COLUMNS}
      onRow={(record) => ({
        onClick: () => navigate(record.id.toString()),
      })}
    />
  );
}
