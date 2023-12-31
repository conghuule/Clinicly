import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState, useContext } from 'react';
import HeaderBar from '../../../components/HeaderBar';
import { Input } from 'antd';
import Modal from '../../../components/Modal/Modal';
import StaffModal from '../../../components/Modal/StaffModal';
import { Button } from 'antd';
import StaffTable from '../../../components/Table/StaffTable';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import config from '../../../config';
const { Search } = Input;

export default function Bills() {
  const { auth } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);
  const [openModal, setOpenModal] = useState(false);
  const staffTableRef = useRef(null);
  return (
    <div>
      <HeaderBar title="Quản lý" icon={faFileInvoiceDollar} image="" name={auth.full_name} role={auth.role} />
      <div className="flex gap-[2rem] mt-[2rem]">
        <Link to={config.routes.staffs}>
          <Button className="h-[40px] bg-blue text-[#fff]">Quản lý nhân viên</Button>
        </Link>
        <Link to={config.routes.regulations}>
          <Button className="h-[40px]">Quản lý quy định</Button>
        </Link>
      </div>
      <div className="flex gap-[20px] mt-[30px] mb-[30px]">
        <Search
          placeholder="Nhập nhân viên cần tìm"
          onSearch={onSearch}
          enterButton
          className="rounded-[4px]"
          size="large"
        />
        <div>
          <Button type="primary" className="h-[40px]" onClick={() => setOpenModal(true)}>
            Thêm nhân viên
          </Button>
          {openModal ? (
            <Modal>
              <StaffModal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                getStaffs={staffTableRef.current?.getStaffs}
              />
            </Modal>
          ) : null}
        </div>
      </div>
      <StaffTable searchValue={searchValue} ref={staffTableRef} />
    </div>
  );
}
