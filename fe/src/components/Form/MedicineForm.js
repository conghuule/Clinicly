import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { UNITS } from '../../utils/constants';

export default function MedicineForm({ defaultValue = {}, onSubmit, submitText, centered }) {
  return (
    <Form
      name="patient-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ ...defaultValue }}
      onFinish={onSubmit}
      autoComplete="off"
      className="mt-[40px]"
    >
      <Form.Item label="Mã thuốc" name="id" rules={[{ required: true, message: 'Nhập mã thuốc' }]}>
        <Input placeholder="Nhập mã thuốc" />
      </Form.Item>

      <Form.Item label="Tên thuốc" name="name" rules={[{ required: true, message: 'Nhập tên thuốc' }]}>
        <Input placeholder="Nhập tên thuốc" />
      </Form.Item>

      <Form.Item label="Thông tin" name="info" rules={[{ required: true, message: 'Nhập thông tin' }]}>
        <Input placeholder="Nhập thông tin" />
      </Form.Item>

      <Form.Item name="unit" label="Đơn vị" rules={[{ required: true, message: 'Nhập mã đơn vị' }]}>
        <Select style={{ width: 400 }} options={UNITS} placeholder="Chọn đơn vị" />
      </Form.Item>

      <Form.Item label="Đơn giá" name="price" rules={[{ required: true, message: 'Nhập đơn giá' }]}>
        <Input placeholder="Nhập đơn giá" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: centered ? 11 : 20, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
