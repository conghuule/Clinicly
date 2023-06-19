import { Modal, Button } from 'antd';
import React from 'react';

export default function PublishBillModal(props) {
  return (
    <Modal {...props} centered width={700} footer={null}>
      <h5 className="text-center text-[2.4rem]">Bạn có muốn xuất hoá đơn không ?</h5>
      <div className="flex place-content-center gap-[20px] mt-[2rem]">
        <Button type="primary" htmlType="submit" className="bg-primary-200 w-[10rem]">
          Có
        </Button>
        <Button type="primary" htmlType="submit" className="bg-primary-200 w-[10rem]">
          Không
        </Button>
      </div>
    </Modal>
  );
}
