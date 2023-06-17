import React from 'react';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PatientForm from '../../components/Form/PatientForm';
import HeaderBar from '../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../config';

export default function NewPatient() {
  const onSubmit = (values) => {
    // TODO: add new patient
    console.log(values);
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
      <h3 className="text-[32px] font-semibold mt-[20px]">New patient</h3>
      <PatientForm onSubmit={onSubmit} submitText="Thêm" />
    </div>
  );
}
