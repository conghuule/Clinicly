import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { GENDERS, ROLES, STATUS } from '../../utils/constants';

export default function StaffForm({ defaultValue = {}, onSubmit, submitText, isAdd = false }) {
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
        <Select style={{ width: 400 }} options={GENDERS} placeholder="Chọn giới tính" />
      </Form.Item>

      <Form.Item label="Ngày sinh" name="birth_date" rules={[{ required: true, message: 'Nhập ngày sinh' }]}>
        <DatePicker style={{ width: 400 }} placeholder="Chọn ngày sinh" />
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
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Nhập số email' }]}>
        <Input placeholder="Nhập email" />
      </Form.Item>
      {isAdd && (
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Nhập password' }]}>
          <Input type="password" placeholder="Nhập password" />
        </Form.Item>
      )}

      <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
        <Select style={{ width: 400 }} options={ROLES} placeholder="Chọn vai trò" />
      </Form.Item>
      <Form.Item label="Lương" name="salary">
        <Input placeholder="Nhập số lương" />
      </Form.Item>
      <Form.Item name="status" label="Trạng thái">
        <Select style={{ width: 400 }} options={STATUS} placeholder="Chọn trạng thái" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
