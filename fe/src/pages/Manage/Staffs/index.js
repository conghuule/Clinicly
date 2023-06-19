import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import HeaderBar from '../../../components/HeaderBar';
import { Input } from 'antd';
import StaffModal from '../../../components/Modal/StaffModal';
import { Button } from 'antd';
import StaffTable from '../../../components/Table/StaffTable';
import { Link } from 'react-router-dom';
const { Search } = Input;

export default function Bills() {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <HeaderBar title="Quản lý" icon={faFileInvoiceDollar} image="" name="Nguyễn Long Vũ" role="Bác sĩ" />
      <div className="flex gap-[2rem] mt-[2rem]">
        <Link to="/manage/staffs">
          <Button className="h-[6rem] bg-blue text-[#fff]">Quản lý nhân viên</Button>
        </Link>
        <Link to="/manage/regulations">
          <Button className="h-[6rem]">Quản lý quy định</Button>
        </Link>
      </div>
      <div className="flex gap-[20px] mt-[20px] mb-[40px]">
        <Search
          placeholder="Nhập nhân viên cần tìm"
          onSearch={onSearch}
          enterButton
          className="bg-primary-200 rounded-[4px]"
        />
        <div>
          <Button type="primary" className="bg-primary-200" onClick={() => setOpenModal(true)}>
            Thêm nhân viên
          </Button>
          <StaffModal open={openModal} onOk={() => setOpenModal(false)} onCancel={() => setOpenModal(false)} />
        </div>
      </div>
      <StaffTable searchValue={searchValue} />
    </div>
  );
}
