import { Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import examinationListApi from '../../services/examinationListApi';
import { PATIENT_COLUMNS_BEING_EXAMINED } from '../../utils/constants';
import { notify } from '../Notification/Notification';

export default function ExaminationListTable({ searchValue = '' }) {
  const navigate = useNavigate();
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

  const filteredPatients = patients.data
    .map((patient, index) => ({
      ...patient.patient,
      index: index + 1,
      key: patient.patient.id,
      birth_date: dayjs(patient.patient.birth_date).format('DD-MM-YYYY'),
      actions: [
        {
          value: 'Khám',
          color: '##2ecc71',
          onClick: () => navigate(`/patients/${patient.patient.id}/create_medical_report/${patient.id}`),
        },
      ],
    }))
    .filter((patient) => patient.full_name.toLowerCase().includes(searchValue.toLowerCase()));

  return <Table dataSource={filteredPatients} columns={PATIENT_COLUMNS_BEING_EXAMINED} loading={patients.loading} />;
}
