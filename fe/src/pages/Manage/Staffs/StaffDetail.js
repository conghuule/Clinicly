import React, { useContext } from 'react';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import StaffForm from '../../../components/Form/StaffForm';
import HeaderBar from '../../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../../config';
import { AuthContext } from '../../../context/authContext';

export default function StaffDetail() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  console.log('staff id: ', id);
  // TODO: get bill detail here

  const staff = {
    id: 1,
    delivery_status: 'Đã giao hàng',
    payment_status: 'Đã thanh toán',
    total: '1000000',
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
      <StaffForm staff={staff} submitText={'Cập nhật nhân viên'} />
    </div>
  );
}
