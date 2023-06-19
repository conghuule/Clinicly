import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';

export default function StaffForm({ defaultValue = {}, onSubmit, submitText }) {
  return (
    <Form
      name="newStaff-form"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...defaultValue }}
      onFinish={onSubmit}
      autoComplete="off"
      className="mt-[40px]"
    >
      <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
        <Input defaultValue={defaultValue.name} placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
        <Select placeholder="Chọn giới tính" allowClear>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Ngày sinh" name="date_of_birth" rules={[{ required: true, message: 'Nhập ngày sinh' }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item label="CCCD" name="personal_id" rules={[{ required: true, message: 'Nhập số căn cước công dân' }]}>
        <Input defaultValue={defaultValue.personal_id} placeholder="Nhập số căn cước công dân" />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Nhập địa chỉ' }]}>
        <Input defaultValue={defaultValue.address} placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item label="SĐT" name="phone_number" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
        <Input defaultValue={defaultValue.phone_number} placeholder="Nhập số điện thoại" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Nhập email' }]}>
        <Input defaultValue={defaultValue.email} placeholder="Nhập email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Nhập password' }]}>
        <Input defaultValue={defaultValue.password} placeholder="Nhập password" />
      </Form.Item>
      <Form.Item label="Loại nhân viên" name="type_staff" rules={[{ required: true, message: 'Nhập loại nhân viên' }]}>
        <Input defaultValue={defaultValue.type_staff} placeholder="Nhập loại nhân viên" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" htmlType="submit" className="bg-primary-200">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
