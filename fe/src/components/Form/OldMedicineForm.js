import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import medicineApi from '../../services/medicineApi';

export default function OldMedicineForm({ onSubmit, submitText, centered }) {
  const [medicines, setMedicines] = useState({
    data: [],
    loading: true,
    params: { page_size: 10, page: 1, total_page: 0 },
  });

  useEffect(() => {
    (async () => {
      const response = await medicineApi.getAll({ ...medicines.params });
      setMedicines({
        ...medicines,
        loading: false,
        data: response.data.map((medicine) => ({ label: medicine.name, value: medicine.id })),
        params: {
          ...medicines.params,
          page_size: response.page_info.page_size,
          page: response.page_info.page,
          total_page: response.page_info.total_page,
        },
      });
    })();
  }, [medicines]);

  return (
    <Form
      name="patient-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={onSubmit}
      autoComplete="off"
      className="mt-[40px]"
    >
      <Form.Item name="medicine_id" label="Chọn thuốc" rules={[{ required: true }]}>
        <Select placeholder="Chọn thuốc" allowClear>
          {medicines.data.map((medicine) => (
            <Option key={medicine.key} value={medicine.value}>
              {medicine.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Nhập số lượng' }]}>
        <Input type="number" placeholder="Nhập số lượng" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: centered ? 11 : 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
