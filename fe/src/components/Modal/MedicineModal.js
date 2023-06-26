import { Modal, Radio } from 'antd';
import React, { useState } from 'react';
import MedicineForm from '../Form/MedicineForm';
import OldMedicineForm from '../Form/OldMedicineForm';
import { notify } from '../Notification/Notification';
import medicineApi from '../../services/medicineApi';
import medicineReportApi from '../../services/medicineReportApi';
import dayjs from 'dayjs';

export default function MedicineModal(props) {
  const [medicineValue, setMedicineValue] = useState('old_medicine');

  const options = [
    { value: 'old_medicine', label: 'Thuốc cũ' },
    { value: 'new_medicine', label: 'Thuốc mới' },
  ];

  const onChange = ({ target: { value } }) => {
    setMedicineValue(value);
  };

  const onSubmitNewMedicine = async (values) => {
    const newMedicine = {
      ...values,
      price: Number(values.price),
      quantity: Number(values.quantity),
    };
    try {
      await medicineApi.add(newMedicine);
      notify({ type: 'success', mess: `Thêm thuốc ${values.full_name} thành công` });
      props.getMedicines('');
    } catch (error) {
      notify({ type: 'error', mess: `Thêm thuốc ${values.full_name} thất bại` });
    }
    props.onCancel();
  };

  const onSubmitOldMedicine = async (values) => {
    const newMedicine = {
      ...values,
      quantity: Number(values.quantity),
      date: dayjs(Date.now()).format('YYYY-MM-DD'),
    };
    try {
      await medicineReportApi.add(newMedicine);
      notify({ type: 'success', mess: `Thêm thuốc thành công` });
      props.getMedicines('');
    } catch (error) {
      notify({ type: 'error', mess: `Thêm thuốc thất bại` });
    }
    props.onCancel();
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
