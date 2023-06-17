import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';

export default function OldMedicineForm({ onSubmit, submitText, centered }) {
  // TODO: replace with api response
  const oldMedicines = Array(100)
    .fill(0)
    .map((_, index) => ({
      key: index,
      label: 'Medicine ' + index,
      value: index,
    }));

  const onMedicineChange = (value) => {
    console.log(value);
  };

  return (
    <Form
      name="patient-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={onSubmit}
      autoComplete="off"
      className="mt-[40px]"
    >
      <Form.Item name="name" label="Chọn thuốc" rules={[{ required: true }]}>
        <Select placeholder="Chọn thuốc" onChange={onMedicineChange} allowClear>
          {oldMedicines.map((medicine) => (
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
        <Button type="primary" htmlType="submit" className="bg-primary-200">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
