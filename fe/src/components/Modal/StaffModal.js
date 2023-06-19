import { Modal } from 'antd';
import React, { useState } from 'react';
import StaffForm from '../Form/StaffForm';

export default function MedicineModal(props) {
  const [medicineValue, setMedicineValue] = useState('old_medicine');

  const options = [
    { value: 'old_medicine', label: 'Thuốc cũ' },
    { value: 'new_medicine', label: 'Thuốc mới' },
  ];

  const onChange = ({ target: { value } }) => {
    console.log('radio2 checked', value);
    setMedicineValue(value);
  };

  const onSubmitNewMedicine = (values) => {
    console.log('values: ', values);
    // TODO: add medicine here
  };

  const onSubmitOldMedicine = (values) => {
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
