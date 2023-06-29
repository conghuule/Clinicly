import { faFileInvoiceDollar, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import HeaderBar from '../../components/HeaderBar';
import { Input, Select } from 'antd';
import InvoiceTable from '../../components/Table/InvoiceTable';
import ConfirmPublishInvoiceModal from '../../components/Modal/ConfirmPublishInvoiceModal';
import { Button } from 'antd';
import { AuthContext } from '../../context/authContext';
import { DELIVERY_STATUS, PAYMENT_STATUS } from '../../utils/constants';

const { Search } = Input;
export default function Invoices() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <HeaderBar title="Hoá đơn" icon={faFileInvoiceDollar} image="" name={auth.full_name} role={auth.role} />
      <div className="flex gap-[20px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập hoá đơn cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />

        <Select
          options={DELIVERY_STATUS}
          value={deliveryStatus || null}
          onChange={(value) => setDeliveryStatus(value)}
          placeholder="Thông tin vận chuyển"
          style={{ width: 500 }}
          size="large"
        />
        <Select
          options={PAYMENT_STATUS}
          value={paymentStatus || null}
          onChange={(value) => setPaymentStatus(value)}
          placeholder="Thông tin thanh toán"
          style={{ width: 500 }}
          size="large"
        />

        <Button
          className="h-[40px]"
          onClick={() => {
            setDeliveryStatus('');
            setPaymentStatus('');
            setSearchValue('');
          }}
        >
          <FontAwesomeIcon icon={faRotate} />
        </Button>

        <div>
          {openModal ? (
            <Modal>
              <ConfirmPublishInvoiceModal
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
              />
            </Modal>
          ) : null}
        </div>
      </div>
      <InvoiceTable searchValue={searchValue} deliveryStatus={deliveryStatus} paymentStatus={paymentStatus} />
    </div>
  );
}
