import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PatientForm from '../../components/Form/PatientForm';
import HeaderBar from '../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../config';
import patientApi from '../../services/patientApi';
import { GENDERS } from '../../utils/constants';
import { notify } from '../../components/Notification/Notification';
import { AuthContext } from '../../context/authContext';

export default function PatientDetail() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await patientApi.getById(id);
      setPatient(response.data);
    })();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      const newPatient = {
        ...values,
        birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
      };
      await patientApi.update(id, newPatient);

      notify({ type: 'success', mess: 'Cập nhật thành công' });
    } catch (error) {
      notify({ type: 'error', mess: 'Cập nhật thất bại' });
    }
  };

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name={auth.full_name} role={auth.role} />
      <div className="mt-[20px] flex justify-between">
        <Link to={config.routes.patients}>
          <Button type="primary">Trở về</Button>
        </Link>
        <div className="flex gap-[20px]">
          <Button type="primary" onClick={() => navigate(`create_medical_report`)}>
            Tạo phiếu khám
          </Button>
          <Button type="primary">
            <Link to={`/patients/${id}/history`}>Lịch sử khám</Link>
          </Button>
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
