import { faFileInvoiceDollar, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import HeaderBar from '../../components/HeaderBar';
import { Input } from 'antd';
import InvoiceTable from '../../components/Table/InvoiceTable';
import ConfirmPublishInvoiceModal from '../../components/Modal/ConfirmPublishInvoiceModal';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Search } = Input;
export default function Invoices() {
  const [searchValue, setSearchValue] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const handleDeliveryStatusChange = (event) => {
    setDeliveryStatus(event.key);
  };
  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.key);
  };
  const onSearch = (value) => {
    setSearchValue(value);
  };
  const [openModal, setOpenModal] = useState(false);
  const menuDelivery = (
    <Menu onClick={handleDeliveryStatusChange}>
      <Menu.Item key={true} className="h-[40px]">
        Đã giao
      </Menu.Item>
      <Menu.Item key={false} className="h-[40px]">
        Chưa giao
      </Menu.Item>
    </Menu>
  );
  const menuPayment = (
    <Menu onClick={handlePaymentStatusChange}>
      <Menu.Item key={true} className="h-[40px]">
        Đã thanh toán
      </Menu.Item>
      <Menu.Item key={false} className="h-[40px]">
        Chưa thanh toán
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <HeaderBar title="Hoá đơn" icon={faFileInvoiceDollar} image="" name="Nguyễn Long Vũ" role="Bác sĩ" />
      <div className="flex gap-[20px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập hoá đơn cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
        <Dropdown overlay={menuDelivery} className="h-[40px]">
          <Button>
            Trạng thái giao hàng <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={menuPayment} className="h-[40px]">
          <Button>
            Trạng thái thanh toán <DownOutlined />
          </Button>
        </Dropdown>
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
