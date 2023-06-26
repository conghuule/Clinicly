import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATIENT_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import patientApi from '../../services/patientApi';
import dayjs from 'dayjs';

export default function PatientTable({ searchValue }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [patients, setPatients] = useState([]);

  const filteredPatients = patients
    .map((patient) => ({
      key: patient.id,
      ...patient,
      actions: [
        {
          value: 'Xoá',
          color: 'error',
          onClick: () => {
            setOpenModal(true);
            setTitle(patient.full_name);
          },
        },
      ],
    }))
    .filter((item) => item.full_name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    (async () => {
      try {
        const response = await patientApi.getAll();
        setPatients(
          response.data.map((patient) => ({ ...patient, birth_date: dayjs(patient.birth_date).format('DD-MM-YYYY') })),
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
