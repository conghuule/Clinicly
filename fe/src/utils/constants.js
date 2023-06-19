import { Tag } from 'antd';

export const PATIENT_COLUMNS = [
  {
    title: 'Tên bệnh nhân',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'date_of_birth',
    key: 'date_of_birth',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, { actions }) => (
      <>
        {actions.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

export const MEDICINE_COLUMNS = [
  {
    title: 'Mã thuốc',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên thuốc',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, { actions }) => (
      <>
        {actions.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
export const BILL_COLUMNS = [
  {
    title: 'Mã hoá đơn',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Trạng thái giao thuốc',
    dataIndex: 'delivery_status',
    key: 'delivery_status',
  },
  {
    title: 'Trạng thái thanh toán',
    dataIndex: 'payment_status',
    key: 'payment_status',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'Total',
    key: 'Total',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, { actions }) => (
      <>
        {actions.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
export const STAFF_COLUMNS = [
  {
    title: 'Tên nhân viên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'date_of_birth',
    key: 'date_of_birth',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Loại nhân viên',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, { actions }) => (
      <>
        {actions.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
export const REGULATION_COLUMNS = [
  {
    title: 'Mã quy định',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên quy định',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giá trị',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, { actions }) => (
      <>
        {actions.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
