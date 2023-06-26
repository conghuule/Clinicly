import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import PatientForm from '../../components/Form/PatientForm';
import HeaderBar from '../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../config';
import patientApi from '../../services/patientApi';
import { GENDERS } from '../../utils/constants';
import { notify } from '../../components/Notification/Notification';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState({});

  useEffect(() => {
    (async () => {
      const response = await patientApi.getById(id);
      setPatient(response.data);
    })();
  }, [id]);

  const onSubmit = async (values) => {
    console.log({ ...values, birth_date: dayjs(values.birth_date).format('YYYY-MM-DD') });
    try {
      const newPatient = {
        ...values,
        birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
      };
      await patientApi.update(id, newPatient);

      notify({ type: 'success', mess: 'Cập nhật thành công' });
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: 'Cập nhật thất bại' });
    }
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
          defaultValue={{
            ...patient,
            birth_date: dayjs(patient.birth_date),
            gender: GENDERS.find((gender) => gender.label === patient.gender).value,
          }}
          onSubmit={onSubmit}
          submitText="Lưu"
        />
      )}
    </div>
  );
}
