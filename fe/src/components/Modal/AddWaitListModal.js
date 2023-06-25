import { Button, Input, Modal } from 'antd';
import { React, useState } from 'react';
import PatientModal from './PatientModal';
import WaitListTable from '../Table/WaitListTable';
const { Search } = Input;

export default function AddWaitListModal(props) {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Modal {...props} centered width={1000} footer={null}>
      <h5 className="text-center text-[24px]">Thêm vào danh sách đợi khám</h5>
      <div className="flex gap-[80px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập bệnh nhân cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
        <div>
          <Button type="primary" onClick={() => setOpenModal(true)} size="large">
            Thêm bệnh nhân
          </Button>
          <PatientModal open={openModal} onCancel={() => setOpenModal(false)} />
        </div>
      </div>
      <WaitListTable searchValue={searchValue} />
    </Modal>
  );
}
