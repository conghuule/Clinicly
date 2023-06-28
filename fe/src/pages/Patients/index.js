import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useRef, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import PatientTable from '../../components/Table/PatientTable';
import { Button, Input } from 'antd';
import PatientModal from '../../components/Modal/PatientModal';
import { AuthContext } from '../../context/authContext';
const { Search } = Input;

export default function Patients() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const patientTableRef = useRef(null);

  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name={auth.full_name} role={auth.role} />
      <div className="flex gap-[80px] mt-[30px] mb-[30px]">
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
          <PatientModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            getPatients={patientTableRef.current?.getPatients}
          />
        </div>
      </div>
      <PatientTable searchValue={searchValue} ref={patientTableRef} />
    </div>
  );
}
