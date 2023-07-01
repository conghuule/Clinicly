import { faPills } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MedicineForm from '../../components/Form/MedicineForm';
import HeaderBar from '../../components/HeaderBar';
import { notify } from '../../components/Notification/Notification';
import config from '../../config';
import medicineApi from '../../services/medicineApi';
import { UNITS } from '../../utils/constants';
import { AuthContext } from '../../context/authContext';

export default function MedicineDetail() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [medicine, setMedicine] = useState({});

  useEffect(() => {
    (async () => {
      const response = await medicineApi.getById(id);
      setMedicine(response.data);
    })();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      const newMedicine = {
        ...values,
        unit: UNITS.find((unit) => unit.value === values.unit)?.value || 1,
        quantity: Number(values.quantity),
        price: Number(values.price),
      };
      await medicineApi.update(id, newMedicine);
      notify({ type: 'success', mess: 'Cập nhật thành công' });
    } catch (error) {
      notify({ type: 'error', mess: 'Cập nhật thất bại' });
    }
  };

  return (
    <div>
      <HeaderBar title="Kho thuốc" icon={faPills} image="" name={auth.full_name} role={auth.role} />
      <div className="mt-[20px] flex justify-between">
        <Link to={config.routes.medicines}>
          <Button type="primary">Trở về</Button>
        </Link>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">{medicine.name}</h3>
      {medicine.id && <MedicineForm defaultValue={medicine} onSubmit={onSubmit} isUpdate submitText="Lưu" />}
    </div>
  );
}
