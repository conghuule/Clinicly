import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINE_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import medicineApi from '../../services/medicineApi';

export default function MedicineTable({ searchValue }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

  const [medicines, setMedicines] = useState([]);

  const filteredMedicines = medicines
    .map((medicine) => ({
      key: medicine.id,
      ...medicine,
      actions: [
        {
          value: 'Xoá',
          color: '#dc2626',
          onClick: () => {
            setOpenModal(true);
            setTitle(medicine.name);
          },
        },
      ],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    (async () => {
      try {
        const response = await medicineApi.getAll();
        setMedicines(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Table
        dataSource={filteredMedicines}
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
