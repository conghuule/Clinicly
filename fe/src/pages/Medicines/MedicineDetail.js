import { faPills } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import MedicineForm from '../../components/Form/MedicineForm';
import HeaderBar from '../../components/HeaderBar';
import config from '../../config';

export default function MedicineDetail() {
  const { id } = useParams();
  console.log('medicine id: ', id);
  // TODO: get medicine detail here

  const medicine = {
    id: 1,
    name: 'Medicine 1',
    price: 12000,
    quantity: 100,
    info: 'aaaaaa',
    unit_id: 32,
  };

  const onSubmit = (values) => {
    console.log('medicine:', values);
    // TODO: call api to update medicine here
  };

  return (
    <div>
      <HeaderBar title="Kho thuốc" icon={faPills} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="mt-[20px] flex justify-between">
        <Button type="primary" className="bg-primary-200">
          <Link to={config.routes.medicines}>Trở về</Link>
        </Button>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">{medicine.name}</h3>
      <MedicineForm medicine={medicine} onSubmit={onSubmit} submitText="Lưu" />
    </div>
  );
}
