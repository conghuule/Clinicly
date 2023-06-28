import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import HeaderBar from '../../components/HeaderBar';
import { Input } from 'antd';
import InvoiceTable from '../../components/Table/InvoiceTable';
import ConfirmPublishInvoiceModal from '../../components/Modal/ConfirmPublishInvoiceModal';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/authContext';

const { Search } = Input;

export default function Bills() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  const [openModal, setOpenModal] = useState(false);
  const handleMenuClick = (e) => {
    setSearchValue(e.key);
  };
  const [deliveryStatus, setDeliveryStatus] = useState('Trạng thái giao hàng');
  const [payStatus, setPayStatus] = useState('Trạng thái thanh toán');

  const menuDelivery = (
    <Menu>
      <Menu.Item
        onClick={(e) => {
          handleMenuClick(e);
          setDeliveryStatus('Đã giao');
        }}
        key="Đã giao"
        className="h-[40px]"
      >
        Đã giao
      </Menu.Item>
      <Menu.Item
        onClick={(e) => {
          handleMenuClick(e);
          setDeliveryStatus('Chưa giao');
        }}
        key="Chưa giao"
        className="h-[40px]"
      >
        Chưa giao
      </Menu.Item>
    </Menu>
  );
  const menuPayment = (
    <Menu>
      <Menu.Item
        onClick={(e) => {
          handleMenuClick(e);
          setPayStatus('Đã thanh toán');
        }}
        key="Đã thanh toán"
        className="h-[40px]"
      >
        Đã thanh toán
      </Menu.Item>
      <Menu.Item
        onClick={(e) => {
          handleMenuClick(e);
          setPayStatus('Chưa thanh toán');
        }}
        key="Chưa thanh toán"
        className="h-[40px]"
      >
        Chưa thanh toán
      </Menu.Item>
    </Menu>
  );
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
        <Dropdown overlay={menuDelivery} className="h-[40px]">
          <Button style={{ display: 'inline-block', width: 400 }}>
            {deliveryStatus} <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={menuPayment} className="h-[40px]">
          <Button style={{ display: 'inline-block', width: 400 }}>
            {payStatus} <DownOutlined />
          </Button>
        </Dropdown>
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
      <InvoiceTable searchValue={searchValue} />
    </div>
  );
}
