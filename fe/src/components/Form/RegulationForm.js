import React from 'react';
import { Button, Form, Input } from 'antd';
export default function StaffForm({ defaultValue = {}, onSubmit, submitText }) {
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
      <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Nhập ID' }]}>
        <Input placeholder="Nhập ID" />
      </Form.Item>
      <Form.Item label="Tên quy định" name="name" rules={[{ required: true, message: 'Nhập tên quy định' }]}>
        <Input placeholder="Nhập tên quy định" />
      </Form.Item>
      <Form.Item label="Giá trị" name="value" rules={[{ required: true, message: 'Nhập giá trị' }]}>
        <Input placeholder="Nhập giá trị" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
