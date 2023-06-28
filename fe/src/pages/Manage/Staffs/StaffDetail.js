import React from 'react';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import StaffForm from '../../../components/Form/StaffForm';
import HeaderBar from '../../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../../config';
import staffAPI from '../../../services/staffAPI';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { notify } from '../../../components/Notification/Notification';
import { GENDERS, ROLES, STATUS } from '../../../utils/constants';
export default function StaffDetail() {
  const { id } = useParams();
  const [staff, setStaff] = useState({});

  const getStaffDetail = async () => {
    const res = await staffAPI.getByID(id);
    setStaff(res.data);
  };
  useEffect(() => {
    getStaffDetail();
  }, []);
  const onSubmit = async (values) => {
    try {
      const newStaff = {
        ...values,
        birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
        salary: parseInt(values.salary),
      };
      await staffAPI.update(id, newStaff);
      notify({ type: 'success', mess: 'Cập nhật thành công' });
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: 'Cập nhật thất bại' });
    }
  };
  return (
    <div>
      <HeaderBar title="Quản lý" icon={faFileInvoiceDollar} image="" name="Nguyen Long Vu" role="Bac si" />
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
            gender: GENDERS.find((gender) => gender.label === staff.gender)?.value,
            role: ROLES.find((role) => role.label === staff.role)?.value,
            status: STATUS.find((status) => status.label === staff.status)?.value,
          }}
          onSubmit={onSubmit}
          submitText={'Cập nhật nhân viên'}
        />
      )}
    </div>
  );
}
