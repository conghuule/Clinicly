import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import { Input } from 'antd';
import BillTable from '../../components/Table/BillTable';
import PublishBillModal from '../../components/Modal/PublishBillModal';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function Bills() {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  const [openModal, setOpenModal] = useState(false);
  const handleMenuClick = (e) => {
    setSearchValue(e.key);
  };
  const menuDelivery = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Đã giao">Đã giao</Menu.Item>
      <Menu.Item key="Chưa giao">Chưa giao</Menu.Item>
    </Menu>
  );
  const menuPayment = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Đã thanh toán">Đã thanh toán</Menu.Item>
      <Menu.Item key="Chưa thanh toán">Chưa thanh toán</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <HeaderBar title="Hoá đơn" icon={faFileInvoiceDollar} image="" name="Nguyễn Long Vũ" role="Bác sĩ" />
      <div className="flex gap-[20px] mt-[20px] mb-[40px]">
        <Search
          placeholder="Nhập hoá đơn cần tìm"
          onSearch={onSearch}
          enterButton
          className="bg-primary-200 rounded-[4px]"
        />
        <Dropdown overlay={menuDelivery}>
          <Button>
            Trạng thái giao hàng <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={menuPayment}>
          <Button>
            Trạng thái thanh toán <DownOutlined />
          </Button>
        </Dropdown>
        <div>
          <Button type="primary" className="bg-primary-200" onClick={() => setOpenModal(true)}>
            Xuất hoá đơn
          </Button>
          <PublishBillModal open={openModal} onOk={() => setOpenModal(false)} onCancel={() => setOpenModal(false)} />
        </div>
      </div>
      <BillTable searchValue={searchValue} />
    </div>
  );
}
