import React from 'react';
import dayjs from 'dayjs';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import PatientForm from '../../components/Form/PatientForm';
import HeaderBar from '../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../config';

export default function PatientDetail() {
  const { id } = useParams();
  console.log('patient id: ', id);
  // TODO: get patient detail here

  const patient = {
    id: 1,
    name: 'Patient 1',
    gender: 'male',
    date_of_birth: dayjs(new Date()),
    personal_id: '11111',
    address: 'LA',
    phone_number: '1234',
  };

  const onSubmit = (values) => {
    console.log('patient:', values);
    // TODO: call api to update patient here
  };

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="mt-[20px] flex justify-between">
        <Button type="primary" className="bg-primary-200">
          <Link to={config.routes.patients}>Trở về</Link>
        </Button>
        <div className="flex gap-[20px]">
          <Button type="primary" className="bg-primary-200">
            Tạo phiếu khám
          </Button>
          <Button type="primary" className="bg-primary-200">
            Lịch sử khám
          </Button>
        </div>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">{patient.name}</h3>
      <PatientForm patient={patient} onSubmit={onSubmit} submitText="Lưu" />
    </div>
  );
}
