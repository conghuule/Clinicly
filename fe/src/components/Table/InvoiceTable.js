import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INVOICE_COLUMNS } from '../../utils/constants';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ConfirmPublishInvoiceModal from '../Modal/ConfirmPublishInvoiceModal';
import invoiceAPI from '../../services/invoiceAPI';
import { notify } from '../Notification/Notification';
export default function InvoiceTable({ searchValue, deliveryStatus, paymentStatus }) {
  const navigate = useNavigate();
  const [openBillModal, setOpenBillModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const payment_status = paymentStatus === '' ? paymentStatus : JSON.parse(paymentStatus);
  const delivery_status = deliveryStatus === '' ? paymentStatus : JSON.parse(deliveryStatus);
  useEffect(() => {
    getInvoices();
  }, []);
  async function getInvoices() {
    try {
      const res = await invoiceAPI.getInvoices();
      const json = res.data;
      json.forEach((element) => {
        element.key = element.id;
        element.actions = [
          { value: 'Thanh toán', onClick: () => updatePaymentStatus(element.id, element.payment_status) },
          { value: 'Giao thuốc', onClick: () => updateDeliveryStatus(element.id, element.delivery_status) },
          { value: 'Xuất hoá đơn', onClick: () => setOpenBillModal(true) },
        ];
      });
      setInvoices(json);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  const updatePaymentStatus = async (id, status) => {
    if (status) {
      notify({ type: 'error', mess: 'Hoá đơn đã thanh toán' });
      return;
    }
    try {
      await invoiceAPI.update(id, { payment_status: !status });
      notify({ type: 'success', mess: 'Cập nhật thành công' });
      getInvoices();
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: 'Cập nhật thất bại' });
    }
  };
  const updateDeliveryStatus = async (id, status) => {
    if (status) {
      notify({ type: 'error', mess: 'Đơn thuốc đã được giao' });
      return;
    }
    try {
      await invoiceAPI.update(id, { delivery_status: !status });
      notify({ type: 'success', mess: 'Cập nhật thành công' });
      getInvoices();
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: 'Cập nhật thất bại' });
    }
  };
  const filteredInvoices = invoices.filter((item) => {
    return (
      item.id.toString().includes(searchValue.toLowerCase()) &&
      (paymentStatus === '' || item.payment_status === payment_status) &&
      (deliveryStatus === '' || item.delivery_status === delivery_status)
    );
  });
  return (
    <div>
      <Table
        dataSource={filteredInvoices}
        columns={INVOICE_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        rowClassName="cursor-pointer"
      />
      {openBillModal ? (
        <Modal>
          <ConfirmPublishInvoiceModal
            open={openBillModal}
            onOk={() => setOpenBillModal(false)}
            onCancel={() => setOpenBillModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
}
