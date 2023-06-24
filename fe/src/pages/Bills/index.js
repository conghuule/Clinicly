import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
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
      <Menu.Item key="Đã giao" className="h-[40px]">
        Đã giao
      </Menu.Item>
      <Menu.Item key="Chưa giao" className="h-[40px]">
        Chưa giao
      </Menu.Item>
    </Menu>
  );
  const menuPayment = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Đã thanh toán" className="h-[40px]">
        Đã thanh toán
      </Menu.Item>
      <Menu.Item key="Chưa thanh toán" className="h-[40px]">
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
        <div>
          <Button type="primary" onClick={() => setOpenModal(true)} size="large">
            Xuất hoá đơn
          </Button>
          {openModal ? (
            <Modal>
              <PublishBillModal
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
              />
            </Modal>
          ) : null}
        </div>
      </div>
      <BillTable searchValue={searchValue} />
    </div>
  );
}
