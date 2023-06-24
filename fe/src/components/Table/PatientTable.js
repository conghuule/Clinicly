import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPatients } from '../../redux/patient/selectors';
import { getAllPatients } from '../../redux/patient/slice';
import { PATIENT_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';

export default function PatientTable({ searchValue }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const patients = useSelector(selectPatients);

  const filteredPatients = patients
    .map((patient) => ({
      key: patient.id,
      ...patient,
      actions: [
        {
          value: 'Xoá',
          onClick: () => {
            setOpenModal(true);
            setTitle(patient.full_name);
          },
        },
      ],
    }))
    .filter((item) => item.full_name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  return (
    <>
      <Table
        dataSource={filteredPatients}
        columns={PATIENT_COLUMNS}
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
