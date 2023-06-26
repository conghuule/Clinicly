import { Table } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATIENT_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import patientApi from '../../services/patientApi';
import dayjs from 'dayjs';
import { notify } from '../Notification/Notification';

const PatientTable = ({ searchValue }, ref) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({ name: '', id: null });
  const [patients, setPatients] = useState({
    data: [],
    loading: true,
    params: { page_size: 10, page: 1, total_page: 0 },
  });

  const deletePatient = async ({ id, name }) => {
    try {
      await patientApi.delete(id);
      notify({ type: 'success', mess: `Xóa ${name} thành công` });
      getPatients(searchValue);
    } catch (error) {
      notify({ type: 'error', mess: 'Xóa thất bại' });
    }

    setOpenModal(false);
  };

  useImperativeHandle(ref, () => {
    return {
      getPatients,
    };
  });

  const getPatients = async (searchValue) => {
    try {
      const response = await patientApi.getAll({ ...patients.params, name: searchValue });
      setPatients({
        ...patients,
        loading: false,
        data: response.data.map((patient) => ({
          ...patient,
          key: patient.id,
          birth_date: dayjs(patient.birth_date).format('DD-MM-YYYY'),
        })),
        params: {
          ...patients.params,
          page_size: response.page_info.page_size,
          page: response.page_info.page,
          total_page: response.page_info.total_page,
        },
      });
    } catch (error) {
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  const onChange = (action) => {
    setPatients({
      ...patients,
      params: {
        ...patients.params,
        page_size: action.pageSize,
        page: action.current,
      },
    });
  };

  const filteredPatients = patients.data.map((patient) => ({
    key: patient.id,
    ...patient,
    actions: [
      {
        value: 'Xoá',
        color: '#dc2626',
        onClick: () => {
          setOpenModal(true);
          setSelectedPatient({ name: patient.full_name, id: patient.id });
        },
      },
    ],
  }));

  useEffect(() => {
    getPatients(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients.params.page_size, patients.params.page, searchValue]);

  return (
    <>
      <Table
        loading={patients.loading}
        dataSource={filteredPatients}
        columns={PATIENT_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        pagination={{
          current: patients.params.page,
          pageSize: patients.params.page_size,
          total: patients.params.total_page * patients.params.page_size,
          showSizeChanger: true,
        }}
        onChange={onChange}
        rowClassName="cursor-pointer"
      />
      <ConfirmDeleteModal
        title={selectedPatient.name}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => deletePatient(selectedPatient)}
      />
    </>
  );
};

export default forwardRef(PatientTable);
