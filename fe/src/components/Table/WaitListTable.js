import { Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATIENT_COLUMNS } from '../../utils/constants';
import ConfirmAddModal from '../Modal/ConfirmAddModal';

export default function WaitListTable({ searchValue }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

  // TODO: replace with api response
  const patients = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      id: index,
      name: 'Patient ' + index,
      date_of_birth: 12,
      address: 'Address ' + index,
      phone_number: '123',
      actions: [
        {
          value: 'Them',
          color: '#47BB92',
          onClick: () => {
            setOpenModal(true);
            setTitle(' bệnh nhân ở vị trí ' + index);
          },
        },
      ],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <Table
        dataSource={patients}
        columns={PATIENT_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        rowClassName="cursor-pointer"
      />
      <ConfirmAddModal
        title={title}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
      />
    </>
  );
}