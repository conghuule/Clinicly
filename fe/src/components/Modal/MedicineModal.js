import { Modal, Radio } from 'antd';
import React, { useState } from 'react';
import MedicineForm from '../Form/MedicineForm';
import OldMedicineForm from '../Form/OldMedicineForm';

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
      <h5 className="text-center text-[24px]">Nhập thuốc {medicineValue === 'old_medicine' ? 'cũ' : 'mới'}</h5>

      <Radio.Group
        options={options}
        onChange={onChange}
        value={medicineValue}
        className="text-center w-full mt-[20px]"
      />

      {medicineValue === 'old_medicine' ? (
        <OldMedicineForm onSubmit={onSubmitOldMedicine} submitText="Nhập" centered />
      ) : (
        <MedicineForm onSubmit={onSubmitNewMedicine} submitText="Nhập" centered />
      )}
    </Modal>
  );
}
