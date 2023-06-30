import { Table } from 'antd';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { STAFF_COLUMNS } from '../../utils/constants';
import Modal from '../Modal/Modal';
import staffAPI from '../../services/staffAPI';
import { useImperativeHandle } from 'react';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import { notify } from '../Notification/Notification';
import dayjs from 'dayjs';

const StaffTable = ({ searchValue }, ref) => {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [selectedStaff, setSelectedStaff] = useState({ name: '', id: null });
  const [staffs, setStaffs] = useState({
    data: [],
    loading: true,
    params: { page_size: 10, page: 1, total_page: 0 },
  });

  const deleteStaff = async ({ id, name }) => {
    try {
      await staffAPI.delete(id);
      notify({ type: 'success', mess: `Xóa nhân viên ${name} thành công` });
      getStaffs(searchValue);
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: `Xóa nhân viên ${name} thất bại` });
    }

    setOpenDeleteModal(false);
  };
  useImperativeHandle(ref, () => {
    return {
      getStaffs,
    };
  });

  const getStaffs = async (searchValue) => {
    try {
      const res = await staffAPI.getAll({ ...staffs.params, name: searchValue });
      setStaffs({
        ...staffs,
        loading: false,
        data: res.data.map((staff) => ({
          ...staff,
          key: staff.id,
          birth_date: dayjs(staff.birth_date).format('DD-MM-YYYY'),
        })),
        params: {
          ...staffs.params,
          page_size: res.page_info.page_size,
          page: res.page_info.page,
          total_page: res.page_info.total_page,
        },
      });
    } catch (error) {
      console.log('An error occurred:', error);
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  const onChange = (action) => {
    setStaffs({
      ...staffs,
      params: {
        ...staffs.params,
        page_size: action.pageSize,
        page: action.current,
      },
    });
  };
  const filteredStaffs = staffs.data.map((staff, index) => ({
    key: staff.id,
    ...staff,
    index: index + 1,
    actions: [
      {
        value: 'Xoá',
        color: '#dc2626',
        onClick: () => {
          setOpenDeleteModal(true);
          setSelectedStaff({ name: staff.full_name, id: staff.id });
          setDeleteTitle(`${staff.full_name}`);
        },
      },
    ],
  }));

  useEffect(() => {
    getStaffs(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffs.params.page_size, staffs.params.page, searchValue]);

  return (
    <div>
      <Table
        dataSource={filteredStaffs}
        columns={STAFF_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        onChange={onChange}
        pagination={{
          current: staffs.params.page,
          pageSize: staffs.params.page_size,
          total: staffs.params.total_page * staffs.params.page_size,
          showSizeChanger: true,
        }}
        rowClassName="cursor-pointer"
      />
      {openDeleteModal ? (
        <Modal>
          <ConfirmDeleteModal
            title={` nhân viên ${deleteTitle}`}
            open={openDeleteModal}
            onCancel={() => setOpenDeleteModal(false)}
            onOk={() => deleteStaff(selectedStaff)}
          />
        </Modal>
      ) : null}
    </div>
  );
};
export default forwardRef(StaffTable);
