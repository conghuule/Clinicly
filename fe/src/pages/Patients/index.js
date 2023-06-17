import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import PatientTable from '../../components/Table/PatientTable';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import config from '../../config';
const { Search } = Input;

export default function Patients() {
  const [searchValue, setSearchValue] = useState('');

  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="flex gap-[80px] mt-[20px] mb-[40px]">
        <Search
          placeholder="Nhập bệnh nhân cần tìm"
          onSearch={onSearch}
          enterButton
          className="bg-primary-200 rounded-[4px]"
        />
        <Button type="primary" className="bg-primary-200">
          <Link to={config.routes.patient_new}>Thêm bệnh nhân</Link>
        </Button>
      </div>
      <PatientTable searchValue={searchValue} />
    </div>
  );
}
