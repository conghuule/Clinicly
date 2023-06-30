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
  const [billModal, setBillModal] = useState({ open: false, selectedInvoice: null });
  const [invoices, setInvoices] = useState([]);
  const payment_status = paymentStatus === '' ? paymentStatus : paymentStatus === 1;
  const delivery_status = deliveryStatus === '' ? paymentStatus : deliveryStatus === 1;

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInvoices() {
    try {
      const res = await invoiceAPI.getInvoices();
      const json = res.data;
      json.forEach((element, index) => {
        element.key = element.id;
        element.index = index + 1;
        element.actions = [
          {
            value: 'Thanh toán',
            disabled: element.payment_status === true,
            onClick: () => updatePaymentStatus(element.id, element.payment_status),
          },
          {
            value: 'Giao thuốc',
            disabled: element.delivery_status === true,
            onClick: () => updateDeliveryStatus(element.id, element.delivery_status),
          },
          { value: 'Xuất hoá đơn', onClick: () => setBillModal({ selectedInvoice: element.id, open: true }) },
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

  const getInvoicePDF = async () => {
    try {
      const res = await invoiceAPI.getInvoicePDF(billModal.selectedInvoice);

      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.href = URL.createObjectURL(res, { type: 'application/pdf' });
      link.click();

      notify({ type: 'success', mess: 'Xuất hóa đơn thành công' });
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: 'Xuất hóa đơn thất bại' });
    }

    setBillModal({ selectedInvoice: null, open: false });
  };

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
      {billModal ? (
        <Modal>
          <ConfirmPublishInvoiceModal
            open={billModal.open}
            onOk={getInvoicePDF}
            onCancel={() => setBillModal({ selectedInvoice: null, open: false })}
          />
        </Modal>
      ) : null}
    </div>
  );
}
