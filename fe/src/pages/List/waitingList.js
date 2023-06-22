import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import { PATIENT_COLUMNS } from '../../utils/constants';

export default function WaitingList() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

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
      actions: [
        {
          value: 'Xoá',
          onClick: () => {
            setOpenModal(true);
            setTitle(' bệnh nhân ở vị trí ' + index);
          },
        },
      ],
    }));

  return (
    <div>
      <HeaderBar title="Danh sách đợi khám" icon={faUserClock} image="" name="Nguyen Long Vu" role="Bac si"></HeaderBar>
      <div className="flex justify-end gap-[35px] mb-[40px] mt-[20px]">
        <Button type="primary" className="bg-[#004DB6] h-[5rem] w-[20rem]">
          Người tiếp theo
        </Button>
        <Button type="primary" className="bg-primary-200 h-[5rem] w-[20rem]">
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
      <ConfirmDeleteModal
        title={title}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
      />
    </div>
  );
}
