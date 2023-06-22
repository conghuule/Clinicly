import { Modal } from 'antd';
import React from 'react';
import StaffForm from '../Form/StaffForm';

export default function MedicineModal(props) {
  const onSubmitNewMedicine = (values) => {
    console.log('values: ', values);
    // TODO: add medicine here
  };

  return (
    <Modal {...props} centered width={1000} footer={null}>
      <h5 className="text-center text-[2.4rem]">Thêm nhân viên</h5>
      <StaffForm onSubmit={onSubmitNewMedicine} submitText="Thêm" centered />
    </Modal>
  );
}
