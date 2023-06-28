import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { STAFF_COLUMNS } from '../../utils/constants';
import staffApi from '../../services/staffAPI';

import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import { notify } from '../Notification/Notification';

export default function StaffTable({ searchValue }) {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({ name: '', id: null });

  useEffect(() => {
    getStaffs();
  }, []);

  async function getStaffs() {
    try {
      const res = await staffApi.getStaffs();
      setStaffs(
        res.data.map((staff) => ({
          ...staff,
          key: staff.id,
          actions: [
            {
              value: 'Xoá',
              color: '#dc2626',
              onClick: () => {
                setOpenDeleteModal(true);
                setSelectedStaff({ name: staff.full_name, id: staff.id });
              },
            },
          ],
        })),
      );
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  const filteredStaffs = staffs.filter((item) => item.full_name.toLowerCase().includes(searchValue.toLowerCase()));

  const deleteStaff = async ({ id, name }) => {
    try {
      await staffApi.delete(id);
      notify({ type: 'success', mess: `Xóa ${name} thành công` });
      getStaffs('');
    } catch (error) {
      notify({ type: 'error', mess: 'Xóa thất bại' });
    }
    setOpenDeleteModal(false);
  };

  return (
    <div>
      <Table
        dataSource={filteredStaffs}
        columns={STAFF_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        rowClassName="cursor-pointer"
      />
      <ConfirmDeleteModal
        title={selectedStaff.name}
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onOk={() => deleteStaff(selectedStaff)}
      />
    </div>
  );
}
