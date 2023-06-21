import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import PatientTable from '../../components/Table/PatientTable';
import { Button, Input } from 'antd';
import PatientModal from '../../components/Modal/PatientModal';
const { Search } = Input;

export default function Patients() {
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="flex gap-[80px] mt-[20px] mb-[40px]">
        <Search
          placeholder="Nhập bệnh nhân cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
        <div>
          <Button type="primary" onClick={() => setOpenModal(true)} size="large">
            Thêm bệnh nhân
          </Button>
          <PatientModal open={openModal} onCancel={() => setOpenModal(false)} />
        </div>
      </div>
      <PatientTable searchValue={searchValue} />
    </div>
  );
}
