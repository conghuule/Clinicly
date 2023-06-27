import { Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import examinationListApi from '../../services/examinationListApi';
import { PATIENT_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import { notify } from '../Notification/Notification';

export default function ExaminationListTable({ searchValue = '' }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({ name: '', id: null });
  const [patients, setPatients] = useState({
    data: [],
    loading: true,
  });

  const getPatients = async () => {
    try {
      const response = await examinationListApi.getAll({ status: 2 });
      setPatients({
        loading: false,
        data: response.data,
      });
    } catch (error) {
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  useEffect(() => {
    getPatients(searchValue);
  }, [searchValue]);

  const deletePatient = async ({ id, name }) => {
    try {
      await examinationListApi.delete(id);
      notify({ type: 'success', mess: `Xóa bệnh nhân ${name} thành công` });
      getPatients();
    } catch (error) {
      notify({ type: 'error', mess: 'Xóa thất bại' });
    }
    setOpenModal(false);
  };

  const filteredPatients = patients.data
    .map((patient) => ({
      ...patient.patient,
      key: patient.patient.id,
      birth_date: dayjs(patient.patient.birth_date).format('DD-MM-YYYY'),
      actions: [
        {
          value: 'Xoá',
          color: '#dc2626',
          onClick: () => {
            setOpenModal(true);
            setSelectedPatient({ name: patient.patient.full_name, id: patient.id });
          },
        },
      ],
    }))
    .filter((patient) => patient.full_name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <Table dataSource={filteredPatients} columns={PATIENT_COLUMNS} loading={patients.loading} />
      <ConfirmDeleteModal
        title={selectedPatient.name}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => deletePatient(selectedPatient)}
      />
    </>
  );
}
