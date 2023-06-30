import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PATIENT_HISTORY_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import patientApi from '../../services/patientApi';
import { notify } from '../Notification/Notification';
import dayjs from 'dayjs';

const PatientHistoryTable = ({ searchValue = '' }) => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({ name: '', id: null });
  const [history, setHistory] = useState({
    data: [],
    loading: true,
    params: { page_size: 10, page: 1, total_page: 0 },
  });

  const deleteHistory = async ({ id, name }) => {
    try {
      await patientApi.deleteHistory(id);
      notify({ type: 'success', mess: `Xóa phiếu khám ${id} thành công` });
      getHistory(searchValue);
    } catch (error) {
      notify({ type: 'error', mess: `Xóa phiếu khám ${id} thất bại` });
    }

    setOpenModal(false);
  };

  const getHistory = async (searchValue) => {
    try {
      const response = await patientApi.getHistory({ ...history.params, name: searchValue, patient_id: id });
      setHistory({
        ...history,
        loading: false,
        data: response.data.map((history) => ({
          ...history,
          key: history.id,
          full_name: history.doctor.full_name,
          date: dayjs(history.date).format('DD-MM-YYYY'),
        })),
        params: {
          ...history.params,
          page_size: response.page_info.page_size,
          page: response.page_info.page,
          total_page: response.page_info.total_page,
        },
      });
    } catch (error) {
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  const onChange = (action) => {
    setHistory({
      ...history,
      params: {
        ...history.params,
        page_size: action.pageSize,
        page: action.current,
      },
    });
  };

  const filteredHistory = history.data
    .map((history, index) => ({
      key: history.id,
      ...history,
      index: index + 1,
      actions: [
        {
          value: 'Xoá',
          color: '#dc2626',
          onClick: () => {
            setOpenModal(true);
            setSelectedHistory({ name: history.full_name, id: history.id });
          },
        },
      ],
    }))
    .filter(
      (h) =>
        h.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        h.full_name.toLowerCase().includes(searchValue.toLowerCase()),
    );

  useEffect(() => {
    getHistory(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.params.page_size, history.params.page, searchValue]);

  return (
    <>
      <Table
        loading={history.loading}
        dataSource={filteredHistory}
        columns={PATIENT_HISTORY_COLUMNS}
        pagination={{
          current: history.params.page,
          pageSize: history.params.page_size,
          total: history.params.total_page * history.params.page_size,
          showSizeChanger: true,
        }}
        onChange={onChange}
      />
      <ConfirmDeleteModal
        title={` phiếu khám ${selectedHistory.id}`}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => deleteHistory(selectedHistory)}
      />
    </>
  );
};

export default PatientHistoryTable;
