import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMedicines } from '../../redux/medicine/selectors';
import { getAllMedicines } from '../../redux/medicine/slice';
import { MEDICINE_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';

export default function MedicineTable({ searchValue }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const medicines = useSelector(selectMedicines);

  const filteredMedicines = medicines
    .map((medicine) => ({
      key: medicine.id,
      ...medicine,
      actions: [
        {
          value: 'Xoá',
          onClick: () => {
            setOpenModal(true);
            setTitle(medicine.name);
          },
        },
      ],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    dispatch(getAllMedicines());
  }, [dispatch]);

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
