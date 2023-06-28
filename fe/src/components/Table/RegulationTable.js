import { Table } from 'antd';
import React from 'react';
import { REGULATION_COLUMNS } from '../../utils/constants';
import { useState, useEffect } from 'react';
import regulationAPI from '../../services/regulationAPI';
import { useNavigate } from 'react-router-dom';
export default function RegulationTable({ searchValue }) {
  const [regulations, setRegulations] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRegulations();
  }, []);

  const getRegulations = async () => {
    try {
      const res = await regulationAPI.getALL();
      const json = res.data;
      await json.forEach((element) => {
        element.key = element.id;
        element.actions = [{ value: 'Sửa', onClick: () => navigate(element.id.toString()) }];
      });
      setRegulations(json);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  const filteredRegulations = regulations.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <Table
        dataSource={filteredRegulations}
        columns={REGULATION_COLUMNS}
        onRow={(record) => ({
          onClick: () => navigate(record.id.toString()),
        })}
      />
    </div>
  );
}
