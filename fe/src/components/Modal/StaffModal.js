import { Modal } from 'antd';
import React from 'react';
import StaffForm from '../Form/StaffForm';
import staffAPI from '../../services/staffAPI';
import { notify } from '../Notification/Notification';
import dayjs from 'dayjs';
export default function StaffModal(props) {
  const onSubmitNewStaff = async (values) => {
    const newStaff = {
      ...values,
      birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
      salary: Number(values.salary),
    };
    try {
      await staffAPI.add(newStaff);
      notify({ type: 'success', mess: `Thêm nhân viên ${values.full_name} thành công` });
      props.getStaffs('');
    } catch (error) {
      notify({ type: 'error', mess: `Thêm nhân viên ${values.full_name} thất bại` });
    }
    props.onCancel();
  };

  return (
    <Modal {...props} centered width={1000} footer={null}>
      <h5 className="text-center text-[2.4rem]">Thêm nhân viên</h5>
      <StaffForm onSubmit={onSubmitNewStaff} isAdd={true} submitText="Thêm" centered />
    </Modal>
  );
}
