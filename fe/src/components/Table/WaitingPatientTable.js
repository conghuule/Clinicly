import { Table } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import patientApi from '../../services/patientApi';
import waitingListApi from '../../services/waitingListApi';
import { PATIENT_COLUMNS_IN_WAITING_LIST } from '../../utils/constants';
import ConfirmAddModal from '../Modal/ConfirmAddModal';

import patientApi from '../../services/patientApi';

import { notify } from '../Notification/Notification';

const WaitingListTable = ({ searchValue }, ref) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({ name: '', id: null });
  const [patients, setPatients] = useState({
    data: [],
    loading: true,
    params: { page_size: 10, page: 1, total_page: 0 },
  });
  useEffect(() => {
    getPatients();
  });

  const addPatient = async ({ id, name }) => {
    try {
      await waitingListApi.post({ patient_id: Number(id) });
      notify({ type: 'success', mess: `Thêm ${name} vào danh sách đợi khám thành công` });
      getPatients(searchValue);
    } catch (error) {
      notify({ type: 'error', mess: 'Thêm vào danh sách đợi khám thất bại' });
    }

    setOpenModal(false);
  };

  const getPatients = async (searchValue) => {
    try {
      const response = await patientApi.getAll({ ...patients.params, name: searchValue });
      setPatients({
        ...patients,
        loading: false,
        data: response.data,
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
        value: 'Thêm',
        color: '#47BB92',
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
        columns={PATIENT_COLUMNS_IN_WAITING_LIST}
        pagination={{
          current: patients.params.page,
          pageSize: patients.params.page_size,
          total: patients.params.total_page * patients.params.page_size,
          showSizeChanger: true,
        }}
        onChange={onChange}
        rowClassName="cursor-pointer"
      />
      <ConfirmAddModal
        title={selectedPatient.name}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => addPatient(selectedPatient)}
      />
    </>
  );
};

export default forwardRef(WaitingListTable);
