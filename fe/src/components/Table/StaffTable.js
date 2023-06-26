import { Table } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { STAFF_COLUMNS } from '../../utils/constants';
import Modal from '../Modal/Modal';
import staffAPI from '../../services/staffAPI';

import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';

export default function StaffTable({ searchValue }) {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  useEffect(() => {
    getStaffs();
  });
  async function getStaffs() {
    try {
      const res = await staffAPI.getStaffs();
      const json = res.data;
      await json.forEach((element) => {
        element.key = element.id;
        element.actions = [
          {
            value: 'Sửa',
            onClick: () => navigate(element.id.toString()),
          },
          {
            value: 'Xoá',
            onClick: () => {
              setOpenDeleteModal(true);
              setDeleteTitle(' ' + element.role + ' ' + element.full_name);
            },
          },
        ];
      });
      setStaffs(json);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  const filteredStaffs = staffs.filter((item) => item.full_name.toLowerCase().includes(searchValue.toLowerCase()));
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
      {openDeleteModal ? (
        <Modal>
          <ConfirmDeleteModal
            title={deleteTitle}
            open={openDeleteModal}
            onCancel={() => setOpenDeleteModal(false)}
            onOk={() => setOpenDeleteModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
}
