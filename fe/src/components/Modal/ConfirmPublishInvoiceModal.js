import { Modal } from 'antd';
import React from 'react';

export default function ConfirmPublishInvoiceModal({ open, onCancel, onOk, ...props }) {
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} {...props} centered width={600} okText="Xuất" cancelText="Huỷ">
      <h5 className="text-center text-[24px] font-semibold mb-[32px] w-[500px] mx-auto">
        Bạn thực sự muốn xuất hoá đơn cho đơn hàng này ?
      </h5>
    </Modal>
  );
}
