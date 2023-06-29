import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import medicineApi from '../../services/medicineApi';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';

export default function PrescriptionModal({ onSubmit, medicineData, ...props }) {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await medicineApi.getAll({ page_size: 100, page: 1, total_page: 0 });
      setMedicines(response.data);
    })();
  }, []);

  return (
    <Modal {...props} centered destroyOnClose={true} footer={null} title="Thêm thuốc">
      <Form
        name="prescription-form"
        onFinish={(value) => onSubmit({ ...value, medicine: medicines.find((v) => value.medicine_id === v.id) })}
        autoComplete="off"
        className="mt-[40px]"
        layout="vertical"
        initialValues={medicineData}
      >
        <Form.Item name="medicine_id" label="Chọn thuốc" rules={[{ required: true }]}>
          <Select placeholder="Chọn thuốc" allowClear>
            {medicines.map((medicine) => (
              <Option key={medicine.id} value={medicine.id}>
                {medicine.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Số lượng" name="quantity" min={0} rules={[{ required: true, message: 'Nhập số lượng' }]}>
          <Input type="number" placeholder="Nhập số lượng" />
        </Form.Item>
        <Form.Item label="Cách dùng" name="instruction">
          <TextArea placeholder="Nhập cách dùng" rows={4} />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
