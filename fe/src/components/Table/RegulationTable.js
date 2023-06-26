import { Table } from 'antd';
import React from 'react';
import { REGULATION_COLUMNS } from '../../utils/constants';
import { useState, useEffect } from 'react';
import regulationAPI from '../../services/regulationAPI';
export default function RegulationTable({ searchValue }) {
  const [regulations, setRegulations] = useState([]);

  useEffect(() => {
    getRegulations();
  });

  async function getRegulations() {
    try {
      const res = await regulationAPI.getRegulations();
      const json = res.data;
      await json.data.forEach((element) => {
        element.key = element.id;
        element.actions = [{ value: 'Sửa' }, { value: 'Xoá' }];
      });
      setRegulations(json.data);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  const filteredRegulations = regulations.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return <Table dataSource={filteredRegulations} columns={REGULATION_COLUMNS} />;
}
