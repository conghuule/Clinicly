import { Modal } from 'antd';
import React from 'react';

export default function ConfirmAddModal({ open, onCancel, onOk, title, ...props }) {
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} {...props} centered width={600} okText="Thêm" cancelText="Huỷ">
      <h5 className="text-center text-[24px] font-semibold mb-[32px] w-[500px] mx-auto">
        Thêm
        <span className="font-bold text-primary-300">{title}</span> vào danh sách đợi khám ?
      </h5>
    </Modal>
  );
}
