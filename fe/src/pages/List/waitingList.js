import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import AddWaitListModal from '../../components/Modal/AddWaitListModal';
import WaitingListTable from '../../components/Table/WaitingListTable';
import { AuthContext } from '../../context/authContext';
import waitingListApi from '../../services/waitingListApi';
import { notify } from '../../components/Notification/Notification';

export default function WaitingList() {
  const { auth } = useContext(AuthContext);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [patients, setPatients] = useState({
    data: [],
    loading: true,
  });

  const onSubmit = async () => {
    try {
      await waitingListApi.update(patients.data[0].id, { status: 2 });
      setPatients({ ...patients, data: patients.data.slice(1) });
      notify({ type: 'success', mess: `Thao tác thành công` });
    } catch (error) {
      notify({ type: 'error', mess: `Thao tác thất bại` });
    }
  };

  const onCancelHandel = async () => {
    try {
      const temp = await waitingListApi.getAll({ status: 1 });
      setPatients({ ...patients, data: temp.data });
    } catch (error) {}
    setOpenModalAdd(false);
  };

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
        <Button className="bg-[#004DB6] text-white h-[40px] w-[20rem]" onClick={onSubmit}>
          Người tiếp theo
        </Button>
        <div>
          <Button type="primary" className="bg-primary-200 h-[40px] w-[20rem]" onClick={() => setOpenModalAdd(true)}>
            Thêm vào DSDK
          </Button>
          <AddWaitListModal
            open={openModalAdd}
            onCancel={onCancelHandel}
            patients={patients}
            setPatients={setPatients}
          />
        </div>
      </div>
      <WaitingListTable patients={patients} setPatients={setPatients} />
    </div>
  );
}
