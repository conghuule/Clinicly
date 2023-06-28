import React, { useContext, useEffect } from 'react';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import StaffForm from '../../../components/Form/StaffForm';
import HeaderBar from '../../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../../config';
import { AuthContext } from '../../../context/authContext';
import staffApi from '../../../services/staffAPI';
import { useState } from 'react';
import dayjs from 'dayjs';
import { GENDERS, ROLES, STATUS } from '../../../utils/constants';
import { notify } from '../../../components/Notification/Notification';

export default function StaffDetail() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [staff, setStaff] = useState({});

  useEffect(() => {
    (async () => {
      const response = await staffApi.getById(id);
      setStaff(response.data);
    })();
  }, [id]);

  const handleUpdate = async (values) => {
    const newStaff = { ...values, birth_date: dayjs(values.birth_date).format('YYYY-MM-DD') };
    try {
      await staffApi.update(id, newStaff);
      notify({ type: 'success', mess: `Cập nhật nhân viên ${values.full_name} thành công` });
    } catch (error) {
      notify({ type: 'error', mess: `Cập nhật nhân viên ${values.full_name} thất bại` });
    }
  };

  return (
    <div>
      <HeaderBar title="Quản lý" icon={faFileInvoiceDollar} image="" name={auth.full_name} role={auth.role} />
      <div className="mt-[20px] flex justify-between">
        <Link to={config.routes.staffs}>
          <Button type="primary">Trở về</Button>
        </Link>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">Chi tiết nhân viên {staff.id}</h3>
      {staff.id && (
        <StaffForm
          defaultValue={{
            ...staff,
            birth_date: dayjs(staff.birth_date),
            gender: GENDERS.find((gender) => gender.label === staff.gender).value,
            role: ROLES.find((role) => role.label === staff.role).value,
            status: STATUS.find((status) => status.label === staff.status).value,
          }}
          submitText="Cập nhật"
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
