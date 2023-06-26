import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { GENDERS } from '../../utils/constants';

export default function PatientForm({ defaultValue = {}, onSubmit, submitText }) {
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
      <Form.Item label="Họ và tên" name="full_name" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
        <Select style={{ width: 120 }} options={GENDERS} />
      </Form.Item>

      <Form.Item label="Ngày sinh" name="birth_date" rules={[{ required: true, message: 'Nhập ngày sinh' }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item label="CCCD" name="identity_card" rules={[{ required: true, message: 'Nhập số căn cước công dân' }]}>
        <Input placeholder="Nhập số căn cước công dân" />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Nhập địa chỉ' }]}>
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item label="SĐT" name="phone_number" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
