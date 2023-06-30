import { Table } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINE_COLUMNS } from '../../utils/constants';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import medicineApi from '../../services/medicineApi';
import { notify } from '../Notification/Notification';

const MedicineTable = ({ searchValue }, ref) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState({ name: '', id: null });

  const [medicines, setMedicines] = useState({
    data: [],
    loading: true,
    params: { page_size: 10, page: 1, total_page: 0 },
  });

  const deleteMedicine = async ({ id, name }) => {
    try {
      await medicineApi.delete(id);
      notify({ type: 'success', mess: `Xóa thuốc ${name} thành công` });
      getMedicines(searchValue);
    } catch (error) {
      notify({ type: 'error', mess: `Xóa thuốc ${name} thất bại` });
    }

    setOpenModal(false);
  };

  const getMedicines = async (searchValue) => {
    try {
      const response = await medicineApi.getAll({ ...medicines.params, name: searchValue });
      setMedicines({
        ...medicines,
        loading: false,
        data: response.data,
        params: {
          ...medicines.params,
          page_size: response.page_info.page_size,
          page: response.page_info.page,
          total_page: response.page_info.total_page,
        },
      });
    } catch (error) {
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  const filteredMedicines = medicines.data
    .map((medicine, index) => ({
      key: medicine.id,
      ...medicine,
      index: index + 1,
      actions: [
        {
          value: 'Xoá',
          color: '#dc2626',
          onClick: () => {
            setOpenModal(true);
            setSelectedMedicine({ name: medicine.name, id: medicine.id });
          },
        },
      ],
    }))
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  const onChange = (action) => {
    setMedicines({
      ...medicines,
      params: {
        ...medicines.params,
        page_size: action.pageSize,
        page: action.current,
      },
    });
  };

  useEffect(() => {
    getMedicines('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getMedicines,
    };
  });

  return (
    <>
      <Table
        dataSource={filteredMedicines}
        columns={MEDICINE_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
        loading={medicines.loading}
        pagination={{
          current: medicines.params.page,
          pageSize: medicines.params.page_size,
          total: medicines.params.total_page * medicines.params.page_size,
          showSizeChanger: true,
        }}
        onChange={onChange}
        rowClassName="cursor-pointer"
      />
      <ConfirmDeleteModal
        title={` thuốc ${selectedMedicine.name}`}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => deleteMedicine(selectedMedicine)}
      />
    </>
  );
};

export default forwardRef(MedicineTable);
