import React from 'react';
import dayjs from 'dayjs';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import PatientForm from '../../components/Form/PatientForm';
import HeaderBar from '../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updatePatient } from '../../redux/patient/slice';

export default function PatientDetail() {
  const { id } = useParams();
  const patient = useSelector((state) => state.patient.list.find((patient) => patient.id === +id));

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log(values);
    // dispatch(updatePatient({ id, body: values }));
  };

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="mt-[20px] flex justify-between">
        <Link to={config.routes.patients}>
          <Button type="primary">Trở về</Button>
        </Link>
        <div className="flex gap-[20px]">
          <Button type="primary">Tạo phiếu khám</Button>
          <Button type="primary">Lịch sử khám</Button>
        </div>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">{patient.name}</h3>
      {patient.id && (
        <PatientForm
          defaultValue={{ ...patient, birth_date: dayjs(patient.birth_date) }}
          onSubmit={onSubmit}
          submitText="Lưu"
        />
      )}
    </div>
  );
}
