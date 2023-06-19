import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import HeaderBar from '../../../components/HeaderBar';
import { Input } from 'antd';
import { Button } from 'antd';
import RegulationTable from '../../../components/Table/RegulationTable';
import { Link } from 'react-router-dom';
const { Search } = Input;

export default function Bills() {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  return (
    <div>
      <HeaderBar title="Quản lý" icon={faFileInvoiceDollar} image="" name="Nguyễn Long Vũ" role="Bác sĩ" />
      <div className="flex gap-[2rem] mt-[2rem]">
        <Link to="/manage/staffs">
          <Button className="h-[6rem] ">Quản lý nhân viên</Button>
        </Link>
        <Link to="/manage/regulations">
          <Button className="h-[6rem] bg-blue text-[#fff]">Quản lý quy định</Button>
        </Link>
      </div>
      <div className="flex gap-[20px] mt-[20px] mb-[40px]">
        <Search
          placeholder="Nhập quy định cần tìm"
          onSearch={onSearch}
          enterButton
          className="bg-primary-200 rounded-[4px]"
        />
      </div>
      <RegulationTable searchValue={searchValue} />
    </div>
  );
}
