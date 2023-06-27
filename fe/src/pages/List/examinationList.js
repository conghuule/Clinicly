import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import ExaminationListTable from '../../components/Table/ExaminationListTable';
const { Search } = Input;

export default function ExaminationList() {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Danh sách khám" icon={faRectangleList} image="" name="Nguyen Long Vu" role="Bac si" />
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
