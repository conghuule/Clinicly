import React from 'react';
import { Form, Input } from 'antd';

export default function InvoiceForm({ invoice }) {
  return (
    <Form
      name="invoice-form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...invoice }}
      autoComplete="off"
      className="mt-[40px]"
    >
      <Form.Item label="Mã hoá đơn" name="id">
        <Input placeholder={invoice.id} disabled />
      </Form.Item>
      <Form.Item label="Trạng thái giao hàng" name="delivery_status">
        <Input placeholder={invoice.delivery_status === false ? 'Chưa giao hàng' : 'Đã giao hàng'} disabled />
      </Form.Item>
      <Form.Item label="Trạng thái thanh toán" name="payment_status">
        <Input placeholder={invoice.payment_status === false ? 'Chưa thanh toán' : 'Đã thanh toán'} disabled />
      </Form.Item>
      <Form.Item label="Tổng tiền" name="total">
        <Input placeholder={invoice.total} disabled />
      </Form.Item>
    </Form>
  );
}
