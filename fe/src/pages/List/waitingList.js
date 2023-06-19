import { Button, Table } from 'antd';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATIENT_COLUMNS } from '../../utils/constants';

export default function WaitingList() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // TODO: replace with api response
  const patients = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      id: index,
      name: 'Patient ' + index,
      date_of_birth: 12,
      address: 'Address ' + index,
      phone_number: '123',
      actions: ['Xoá'],
    }));

  return (
    <div>
      <div className="flex justify-end gap-[35px] mb-[40px] mt-[20px]">
        <Button type="primary" className="bg-[#004DB6] h-[5rem] w-[20rem]" onClick={() => setOpenModal(true)}>
          Người tiếp theo
        </Button>
        <Button type="primary" className="bg-primary-200 h-[5rem] w-[20rem]" onClick={() => setOpenModal(true)}>
          Thêm vào DSDK
        </Button>
      </div>
      <Table
        dataSource={patients}
        columns={PATIENT_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
      />
    </div>
  );
}
