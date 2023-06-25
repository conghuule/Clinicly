import { Modal } from 'antd';
import React from 'react';

export default function PublishBillModal({ open, onCancel, onOk, ...props }) {
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} {...props} centered width={600} okText="Xuất" cancelText="Huỷ">
      <h5 className="text-center text-[2.4rem]">Bạn có muốn xuất hoá đơn không ?</h5>
    </Modal>
  );
}
