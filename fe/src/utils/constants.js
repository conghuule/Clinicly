import { Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DateFormat } from './utils';

export const PATIENT_COLUMNS = [
  {
    title: 'Tên bệnh nhân',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birth_date',
    key: 'birth_date',
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
    width: 120,
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <div className="text-center cursor-pointer" key={action.value}>
              <FontAwesomeIcon
                icon={faTrash}
                color={action.color}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className="p-[8px] rounded-[50%] hover:bg-[#fecaca]"
              />
            </div>
          );
        })}
      </>
    ),
  },
];

export const PATIENT_HISTORY_COLUMNS = [
  {
    title: 'Mã phiếu khám',
    dataIndex: 'id',
    key: 'id',
    width: 200,
  },
  {
    title: 'Bác sĩ',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Ngày khám',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Chẩn đoán',
    dataIndex: 'diagnose',
    key: 'diagnose',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    width: 120,
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <div className="text-center cursor-pointer" key={action.value}>
              <FontAwesomeIcon
                icon={faTrash}
                color={action.color}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className="p-[8px] rounded-[50%] hover:bg-[#fecaca]"
              />
            </div>
          );
        })}
      </>
    ),
  },
];

export const PATIENT_COLUMNS_IN_WAITING_LIST = [
  {
    title: 'Tên bệnh nhân',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birth_date',
    key: 'birth_date',
    render: (birth_date) => DateFormat(birth_date),
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
    width: 120,
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <div className="text-center cursor-pointer" key={action.value}>
              <FontAwesomeIcon
                icon={faPlus}
                color={action.color}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className="p-[8px] rounded-[50%] hover:bg-[#bbf7d0]"
              />
            </div>
          );
        })}
      </>
    ),
  },
];

export const PATIENT_COLUMNS_BEING_EXAMINED = [
  {
    title: 'Tên bệnh nhân',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birth_date',
    key: 'birth_date',
    render: (birth_date) => DateFormat(birth_date),
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
    width: 120,
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <Tag
              className="text-center cursor-pointer"
              color="#2ecc71"
              key={action.value}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(e);
              }}
            >
              {action.value.toUpperCase()}
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
    width: 120,
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <div className="text-center cursor-pointer" key={action.value}>
              <FontAwesomeIcon
                icon={faTrash}
                color={action.color}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className="p-[8px] rounded-[50%] hover:bg-[#fecaca]"
              />
            </div>
          );
        })}
      </>
    ),
  },
];
export const INVOICE_COLUMNS = [
  {
    title: 'Mã hoá đơn',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Trạng thái giao thuốc',
    dataIndex: 'delivery_status',
    key: 'delivery_status',
    render: (delivery_status) => (delivery_status ? 'Đã giao thuốc' : 'Chưa giao thuốc'),
  },
  {
    title: 'Trạng thái thanh toán',
    dataIndex: 'payment_status',
    key: 'payment_status',
    render: (payment_status) => (payment_status ? 'Đã thanh toán' : 'Chưa thanh toán'),
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    width: '400px',
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <Tag
              color="error"
              key={action.value}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(e);
              }}
              className={`${action.disabled ? 'cursor-no-drop opacity-60' : ''}`}
            >
              {action.value.toUpperCase()}
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
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birth_date',
    key: 'birth_date',
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
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Thao tác',
    dataIndex: 'actions',
    key: 'actions',
    width: 120,
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          return (
            <div className="text-center cursor-pointer" key={action.value}>
              <FontAwesomeIcon
                icon={faTrash}
                color={action.color}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className="p-[8px] rounded-[50%] hover:bg-[#fecaca]"
              />
            </div>
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
];

export const GENDERS = [
  { value: 1, label: 'Nam' },
  { value: 2, label: 'Nữ' },
  { value: 3, label: 'Khác' },
];

export const ROLES = [
  { value: 1, label: 'Tiếp tân' },
  { value: 2, label: 'Bác sĩ' },
  { value: 3, label: 'Dược sĩ' },
  { value: 4, label: 'Quản lý' },
];

export const STATUS = [
  { value: 1, label: 'Đang làm' },
  { value: 2, label: 'Đã nghỉ' },
];

export const UNITS = [
  { label: 'Viên', value: 1 },
  { label: 'Chai', value: 2 },
];

export const DELIVERY_STATUS = [
  { label: 'Đã giao', value: 1 },
  { label: 'Chưa giao', value: 2 },
];

export const PAYMENT_STATUS = [
  { label: 'Đã thanh toán', value: 1 },
  { label: 'Chưa thanh toán', value: 2 },
];
