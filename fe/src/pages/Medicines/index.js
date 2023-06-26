import { faPills } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import { Button, Input } from 'antd';
import MedicineTable from '../../components/Table/MedicineTable';
import MedicineModal from '../../components/Modal/MedicineModal';
const { Search } = Input;

export default function Medicines() {
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Kho thuốc" icon={faPills} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="flex gap-[80px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập bệnh nhân cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
        <div>
          <Button type="primary" size="large" onClick={() => setOpenModal(true)}>
            Thêm thuốc
          </Button>
          <MedicineModal open={openModal} onCancel={() => setOpenModal(false)} />
        </div>
      </div>
      <MedicineTable searchValue={searchValue} />
    </div>
  );
}
