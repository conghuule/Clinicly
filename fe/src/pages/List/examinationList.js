import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import React, { useContext, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import ExaminationListTable from '../../components/Table/ExaminationListTable';
import { AuthContext } from '../../context/authContext';
const { Search } = Input;

export default function ExaminationList() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Danh sách khám" icon={faRectangleList} image="" name={auth.full_name} role={auth.role} />
      <div className="flex gap-[80px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập bệnh nhân cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
      </div>
      <ExaminationListTable searchValue={searchValue} />
    </div>
  );
}
