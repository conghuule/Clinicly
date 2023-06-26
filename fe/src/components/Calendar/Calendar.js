import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

export default function CalendarHandle({ getValue }) {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker format="YYYY-MM-DD" onChange={onChange} />
    </Space>
  );
}
