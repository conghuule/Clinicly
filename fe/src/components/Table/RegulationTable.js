import { Table } from 'antd';
import React from 'react';
import { REGULATION_COLUMNS } from '../../utils/constants';
import { useState, useEffect } from 'react';
import regulationAPI from '../../services/regulationAPI';
import Modal from '../Modal/Modal';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
export default function RegulationTable({ searchValue }) {
  const [regulations, setRegulations] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  useEffect(() => {
    getRegulations();
  });

  async function getRegulations() {
    try {
      const res = await regulationAPI.getRegulations();
      const json = res.data;
      await json.forEach((element) => {
        element.key = element.id;
        element.actions = [
          { value: 'Sửa' },
          {
            value: 'Xoá',
            onClick: () => {
              setOpenDeleteModal(true);
              setDeleteTitle(' Quy định ' + element.name);
            },
          },
        ];
      });
      setRegulations(json);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  const filteredRegulations = regulations.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <Table dataSource={filteredRegulations} columns={REGULATION_COLUMNS} />
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
