import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import AddWaitListModal from '../../components/Modal/AddWaitListModal';
import WaitingListTable from '../../components/Table/WaitingListTable';

export default function WaitingList() {
  const [openModalAdd, setOpenModalAdd] = useState(false);

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
      <WaitingListTable />
    </div>
  );
}
