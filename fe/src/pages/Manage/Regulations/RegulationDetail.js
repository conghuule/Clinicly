/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import RegulationForm from '../../../components/Form/RegulationForm';
import HeaderBar from '../../../components/HeaderBar';
import regulationAPI from '../../../services/regulationAPI';
import { Button } from 'antd';
import config from '../../../config';
import { notify } from '../../../components/Notification/Notification';

export default function RegulationDetail() {
  const { id } = useParams();
  const [regulation, setRegulation] = useState({});

  useEffect(() => {
    getRegulation();
  }, []);

  const getRegulation = async () => {
    const res = await regulationAPI.getByID(id);
    setRegulation(res.data[0]);
  };

  const onSubmit = async (values) => {
    try {
      const newRegulation = { ...values, value: parseInt(values.value) };
      await regulationAPI.update(id, newRegulation);
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
        <Link to={config.routes.regulations}>
          <Button type="primary">Trở về</Button>
        </Link>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">Chi tiết quy định {regulation.name}</h3>
      {regulation.id && <RegulationForm defaultValue={regulation} onSubmit={onSubmit} submitText="Cập nhật" />}
    </div>
  );
}
