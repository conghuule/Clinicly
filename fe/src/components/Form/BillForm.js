import React from 'react';
import { Form, Input } from 'antd';

export default function BillForm({ bill }) {
  return (
    <Form
      name="bill-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...bill }}
      autoComplete="off"
      className="mt-[40px]"
    >
      <Form.Item label="Mã hoá đơn" name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Trạng thái giao hàng" name="delivery_status">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Trạng thái thanh toán" name="payment_status">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Tổng tiền" name="total">
        <Input disabled />
      </Form.Item>
    </Form>
  );
}
