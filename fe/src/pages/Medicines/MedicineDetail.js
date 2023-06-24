import { faPills } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MedicineForm from '../../components/Form/MedicineForm';
import HeaderBar from '../../components/HeaderBar';
import config from '../../config';

export default function MedicineDetail() {
  const { id } = useParams();
  const medicine = useSelector((state) => state.medicine.list.find((medicine) => medicine.id === id));

  const onSubmit = (values) => {
    console.log('medicine:', values);
    // TODO: call api to update medicine here
  };

  return (
    <div>
      <HeaderBar title="Kho thuốc" icon={faPills} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="mt-[20px] flex justify-between">
        <Link to={config.routes.medicines}>
          <Button type="primary">Trở về</Button>
        </Link>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">{medicine.name}</h3>
      {medicine.id && <MedicineForm defaultValue={medicine} onSubmit={onSubmit} submitText="Lưu" />}
    </div>
  );
}
