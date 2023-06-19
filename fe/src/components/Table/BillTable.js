import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BILL_COLUMNS } from '../../utils/constants';

export default function BillTable({ searchValue }) {
  const navigate = useNavigate();

  // TODO: replace with api response
  const bills = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      id: index,
      delivery_status: 'Đã giao',
      payment_status: 'Đã thanh toán',
      Total: index * 2 + 'VNĐ',
      actions: ['Thanh toán', 'Giao thuốc', 'Xuất hoá đơn'],
    }))
    .filter((item) => item.delivery_status.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <Table
      dataSource={bills}
      columns={BILL_COLUMNS}
      onRow={(record) => ({
        onClick: () => navigate(record.id.toString()),
      })}
    />
  );
}
