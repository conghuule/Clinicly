import { Modal } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import patientApi from '../../services/patientApi';
import PatientForm from '../Form/PatientForm';
import { notify } from '../Notification/Notification';

export default function PatientModal(props) {
  const onSubmit = async (values) => {
    try {
      await patientApi.add({
        ...values,
        birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
      });
      notify({ type: 'success', mess: `Thêm bệnh nhân ${values.full_name} thành công` });
      props.getPatients('');
    } catch (error) {
      notify({ type: 'error', mess: `Thêm bệnh nhân ${values.full_name} thất bại` });
    }
    props.onCancel();
  };

  return (
    <Modal {...props} centered width={1000} footer={null}>
      <h5 className="text-center text-[24px]">Thêm bệnh nhân</h5>
      <PatientForm onSubmit={onSubmit} submitText="Thêm" />
    </Modal>
  );
}
