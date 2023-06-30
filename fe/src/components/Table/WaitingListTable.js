import React, { forwardRef, useEffect, useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import waitingListApi from '../../services/waitingListApi';
import { PATIENT_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import { notify } from '../Notification/Notification';

const WaitingListTable = forwardRef((props, ref) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({ name: '', id: null });
  const { patients, setPatients } = props;

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPatients = async () => {
    try {
      const response = await waitingListApi.getAll({ status: 1 });
      setPatients({
        loading: false,
        data: response.data,
      });
    } catch (error) {
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  const deletePatient = async ({ id, name }) => {
    try {
      await waitingListApi.delete(id);
      notify({ type: 'success', mess: `Xóa bệnh nhân ${name} thành công` });
      getPatients();
    } catch (error) {
      notify({ type: 'error', mess: `Xóa bệnh nhân ${name} thất bại` });
    }
    setOpenModal(false);
  };

  const filteredPatients = patients.data.map((patient, index) => ({
    ...patient.patient,
    key: patient.patient.id,
    index: index + 1,
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
  }));

  return (
    <>
      <Table dataSource={filteredPatients} columns={PATIENT_COLUMNS} loading={patients.loading} ref={ref} />
      <ConfirmDeleteModal
        title={` bệnh nhân ${selectedPatient.name}`}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => deletePatient(selectedPatient)}
      />
    </>
  );
});

export default WaitingListTable;
