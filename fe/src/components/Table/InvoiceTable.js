import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INVOICE_COLUMNS } from '../../utils/constants';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ConfirmPublishInvoiceModal from '../Modal/ConfirmPublishInvoiceModal';
import invoiceAPI from '../../services/invoiceAPI';
export default function InvoiceTable({ searchValue }) {
  const navigate = useNavigate();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openDeliveryModal, setOpenDeliveryModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    getInvoices();
  });
  async function getInvoices() {
    try {
      const res = await invoiceAPI.getInvoices();
      const json = res.data;
      await json.data.forEach((element) => {
        element.key = element.id;
        element.actions = [
          { value: 'Thanh toán', onClick: () => setOpenPaymentModal(true) },
          { value: 'Giao thuốc', onClick: () => setOpenDeliveryModal(true) },
          { value: 'Xuất hoá đơn', onClick: () => setOpenBillModal(true) },
        ];
      });
      setInvoices(json.data);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  const filteredInvoices = invoices.filter((item) => item.id.toString().includes(searchValue.toLowerCase()));

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
      {openPaymentModal ? null : null}
      {openDeliveryModal ? null : null}
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
