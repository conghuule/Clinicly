import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { useContext, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import AddWaitListModal from '../../components/Modal/AddWaitListModal';
import WaitingListTable from '../../components/Table/WaitingListTable';
import { AuthContext } from '../../context/authContext';

export default function WaitingList() {
  const { auth } = useContext(AuthContext);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  return (
    <div>
      <HeaderBar
        title="Danh sách đợi khám"
        icon={faUserClock}
        image=""
        name={auth.full_name}
        role={auth.role}
      ></HeaderBar>
      <div className="flex justify-end gap-[35px] mb-[30px] mt-[30px]">
        <Button className="bg-[#004DB6] text-white h-[40px] w-[20rem]">Người tiếp theo</Button>
        <div>
          <Button type="primary" className="bg-primary-200 h-[40px] w-[20rem]" onClick={() => setOpenModalAdd(true)}>
            Thêm vào DSDK
          </Button>
          <AddWaitListModal open={openModalAdd} onCancel={() => setOpenModalAdd(false)} />
        </div>
      </div>
      <WaitingListTable />
    </div>
  );
}
