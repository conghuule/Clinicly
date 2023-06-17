import React from 'react';
import { Button, Form, Input } from 'antd';

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
        <Input defaultValue={defaultValue.id} placeholder="Nhập mã thuốc" />
      </Form.Item>

      <Form.Item label="Tên thuốc" name="name" rules={[{ required: true, message: 'Nhập tên thuốc' }]}>
        <Input defaultValue={defaultValue.name} placeholder="Nhập tên thuốc" />
      </Form.Item>

      <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Nhập số lượng' }]}>
        <Input defaultValue={defaultValue.address} placeholder="Nhập số lượng" />
      </Form.Item>

      <Form.Item label="Đơn giá" name="price" rules={[{ required: true, message: 'Nhập đơn giá' }]}>
        <Input defaultValue={defaultValue.price} placeholder="Nhập đơn giá" />
      </Form.Item>

      <Form.Item label="Thông tin" name="price" rules={[{ required: true, message: 'Nhập thông tin' }]}>
        <Input defaultValue={defaultValue.info} placeholder="Nhập thông tin" />
      </Form.Item>

      <Form.Item label="Mã đơn vị" name="price" rules={[{ required: true, message: 'Nhập mã đơn vị' }]}>
        <Input defaultValue={defaultValue.price} placeholder="Nhập mã đơn vị" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: centered ? 11 : 4, span: 16 }}>
        <Button type="primary" htmlType="submit" className="bg-primary-200">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
