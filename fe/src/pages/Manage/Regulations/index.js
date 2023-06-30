import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import HeaderBar from '../../../components/HeaderBar';
import { Input } from 'antd';
import { Button } from 'antd';
import RegulationTable from '../../../components/Table/RegulationTable';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import config from '../../../config';
const { Search } = Input;

export default function Bills() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  return (
    <div>
      <HeaderBar title="Quản lý" icon={faFileInvoiceDollar} image="" name={auth.full_name} role={auth.role} />
      <div className="flex gap-[2rem] mt-[2rem]">
        <Link to={config.routes.staffs}>
          <Button className="h-[40px] ">Quản lý nhân viên</Button>
        </Link>
        <Link to={config.routes.regulations}>
          <Button className="h-[40px] bg-blue text-[#fff]">Quản lý quy định</Button>
        </Link>
      </div>
      <div className="flex gap-[20px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập quy định cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
      </div>
      <RegulationTable searchValue={searchValue} />
    </div>
  );
}
