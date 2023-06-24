import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import Modal from '../../components/Modal/Modal';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import { PATIENT_COLUMNS } from '../../utils/constants';
import AddWaitListModal from '../../components/Modal/AddWaitListModal';

export default function WaitingList() {
  const navigate = useNavigate();
  const [openModalDel, setOpenModalDel] = useState(false);
  const [title, setTitle] = useState('');
  const [openModalAdd, setOpenModalAdd] = useState(false);

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
          color: 'error',
          onClick: () => {
            setOpenModalDel(true);
            setTitle(' bệnh nhân ở vị trí ' + index);
          },
        },
      ],
    }));

  return (
    <div>
      <HeaderBar title="Danh sách đợi khám" icon={faUserClock} image="" name="Nguyen Long Vu" role="Bac si"></HeaderBar>
      <div className="flex justify-end gap-[35px] mb-[30px] mt-[30px]">
        <Button type="primary" className="bg-[#004DB6] h-[4.5rem] w-[20rem]">
          Người tiếp theo
        </Button>
        <div>
          <Button type="primary" className="bg-primary-200 h-[4.5rem] w-[20rem]" onClick={() => setOpenModalAdd(true)}>
            Thêm vào DSDK
          </Button>
          <AddWaitListModal open={openModalAdd} onCancel={() => setOpenModalAdd(false)} />
        </div>
      </div>
      <Table
        dataSource={patients}
        columns={PATIENT_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
      />
      {openModal ? (
        <Modal>
          <ConfirmDeleteModal
            title={title}
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
}
