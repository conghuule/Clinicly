import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import PatientHistoryTable from '../../components/Table/PatientHistoryTable';
import { AuthContext } from '../../context/authContext';
import patientApi from '../../services/patientApi';
const { Search } = Input;

export default function PatientHistory() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');

  const { id } = useParams();
  const [patient, setPatient] = useState({});

  useEffect(() => {
    (async () => {
      const response = await patientApi.getById(id);
      setPatient(response.data);
    })();
  }, [id]);

  const onSearch = (value) => setSearchValue(value);

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name={auth.full_name} role={auth.role} />
      <div>
        <Button type="primary" className="mt-[20px]">
          <Link to={`/patients/${id}`}>Trở về</Link>
        </Button>
        <h5 className="text-[24px] mt-[30px] mb-[30px]">
          Lịch sử khám bệnh của <span className="text-primary-300 italic">{patient.full_name}</span>
        </h5>
        <Search
          placeholder="Nhập phiếu khám cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px] mb-[20px]"
          size="large"
        />
      </div>
      <PatientHistoryTable searchValue={searchValue} />
    </div>
  );
}
