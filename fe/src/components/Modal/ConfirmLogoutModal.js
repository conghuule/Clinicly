import { Modal } from 'antd';
import React from 'react';

export default function ConfirmLogoutModal({ open, onCancel, onOk, ...props }) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      {...props}
      centered
      width={600}
      okText="Đăng xuất"
      cancelText="Huỷ"
    >
      <h5 className="text-center text-[24px] font-semibold mb-[32px] w-[500px] mx-auto">
        Bạn thực sự muốn đăng xuất ?
      </h5>
    </Modal>
  );
}
