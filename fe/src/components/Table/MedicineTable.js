import { Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINE_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';

export default function MedicineTable({ searchValue }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

  // TODO: replace with api response
  const medicines = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      id: index,
      name: 'Medicine ' + index,
      price: 12,
      quantity: index * 2,
      actions: [
        {
          value: 'Xoá',
          onClick: () => {
            setOpenModal(true);
            setTitle(' thuốc ở vị trí ' + index);
          },
        },
      ],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <Table
        dataSource={medicines}
        columns={MEDICINE_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        rowClassName="cursor-pointer"
      />
      <ConfirmDeleteModal
        title={title}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
      />
    </>
  );
}
