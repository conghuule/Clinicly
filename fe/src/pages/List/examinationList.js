import { Input } from 'antd';
import React, { useState } from 'react';
import PatientTable from '../../components/Table/PatientTable';
const { Search } = Input;

export default function ExaminationList() {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <div className="flex gap-[80px] mt-[20px] mb-[40px]">
        <Search
          placeholder="Nhập bệnh nhân cần tìm"
          onSearch={onSearch}
          enterButton
          className="bg-primary-200 rounded-[4px]"
        />
      </div>
      <PatientTable searchValue={searchValue} />
    </div>
  );
}
