import { Modal } from 'antd';
import React from 'react';
import PatientForm from '../Form/PatientForm';

export default function PatientModal(props) {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Modal {...props} centered width={1000} footer={null}>
      <h5 className="text-center text-[24px]">Thêm bệnh nhân</h5>
      <PatientForm onSubmit={onSubmit} submitText="Thêm" />
    </Modal>
  );
}
