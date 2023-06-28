import { faPills } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useRef, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import { Button, Input } from 'antd';
import MedicineTable from '../../components/Table/MedicineTable';
import MedicineModal from '../../components/Modal/MedicineModal';
import { AuthContext } from '../../context/authContext';
const { Search } = Input;

export default function Medicines() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const medicineTableRef = useRef(null);

  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Kho thuốc" icon={faPills} image="" name={auth.full_name} role={auth.role} />
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
          <MedicineModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            getMedicines={medicineTableRef.current?.getMedicines}
          />
        </div>
      </div>
      <MedicineTable searchValue={searchValue} ref={medicineTableRef} />
    </div>
  );
}
