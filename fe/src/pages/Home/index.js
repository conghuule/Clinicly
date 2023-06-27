import { faChartSimple, faHospitalUser, faMoneyCheckDollar, faPills, faUser } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, DatePicker, Row, Space, Statistic } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import dashboardApi from '../../services/dashboardApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { notify } from '../../components/Notification/Notification';
import LineChart from './LineChart';

const { RangePicker } = DatePicker;

export default function Home() {
  const [dashboard, setDashboard] = useState({});
  const [dateRange, setDateRange] = useState([dayjs(new Date()).subtract(7, 'day'), dayjs(new Date())]);

  const getDashboard = async (startDate, endDate) => {
    try {
      const response = await dashboardApi.getAll({
        start_date: startDate,
        end_date: endDate,
      });
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
      notify({ type: 'error', mess: 'Lấy dữ liệu thất bại' });
    }
  };

  useEffect(() => {
    getDashboard(dateRange[0].format('YYYY-MM-DD'), dateRange[1].format('YYYY-MM-DD'));
  }, [dateRange]);

  const onChange = (value) => {
    setDateRange(value);
  };

  const totalValueMetric = useMemo(
    () => [
      {
        label: 'Tổng doanh thu',
        icon: faMoneyCheckDollar,
        color: '#3F8600',
        value: dashboard.total_revenue,
      },
      {
        label: 'Tổng số thuốc',
        icon: faPills,
        color: '#3F8600',
        value: dashboard.total_medicine,
      },
      {
        label: 'Tổng số bệnh nhân',
        icon: faHospitalUser,
        color: '#9847FF',
        value: dashboard.total_patient,
      },
      {
        label: 'Tổng số lượt khám',
        icon: faUser,
        color: '#CF1322',
        value: dashboard.total_ticket,
      },
    ],
    [dashboard],
  );

  const newValueMetric = useMemo(
    () => [
      {
        label: 'Bệnh nhân mới',
        color: '#3f8600',
        value: dashboard.new_patient,
      },
      {
        label: 'Lượng thuốc',
        color: '#3f8600',
        value: dashboard.new_medicine,
      },
      {
        label: 'Doanh thu',
        color: '#3f8600',
        value: dashboard.new_revenue,
      },
      {
        label: 'Lượt khám',
        color: '#3f8600',
        value: dashboard.new_ticket,
      },
    ],
    [dashboard],
  );

  return (
    <div>
      <HeaderBar title="Tổng quan" icon={faChartSimple} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="my-5">
        <Row className="p-5 py-7">
          <Space direction="horizontal" size={12}>
            <span>Chọn ngày</span>
            <RangePicker format="DD/MM/YYYY" value={dateRange} onChange={onChange} />
          </Space>
        </Row>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between gap-5">
            {totalValueMetric.map((metric, i) => (
              <Card key={i} bordered={false} className="flex items-center justify-center w-1/4">
                <span className="text-[20px] font-medium">{metric.label}</span>
                <Statistic
                  className="flex items-center justify-center pt-5 pb-5"
                  value={metric.value}
                  valueStyle={{ color: metric.color }}
                  prefix={<FontAwesomeIcon icon={metric.icon} />}
                ></Statistic>
              </Card>
            ))}
          </div>
          <Card bordered={false} className="w-full">
            <span className="text-[20px] font-medium">Tổng quan</span>
            <Row gutter={16} className="mt-5">
              {newValueMetric.map((metric, i) => (
                <Col key={i} span={12} className="mb-5">
                  <Card bordered={false}>
                    <Statistic title={metric.label} value={metric.value} valueStyle={{ color: metric.color }} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
          <div className="w-full flex flex-row gap-5">
            <Card bordered={false} className="w-full">
              <p className="mb-5 text-[20px] flex items-center justify-center font-medium">
                Biểu đồ số lượng bệnh nhân
              </p>
              <LineChart
                data={dashboard.patient_data}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                color="rgb(0, 77, 182)"
              />
            </Card>
            <Card bordered={false} className="w-full">
              <p className="mb-5 text-[20px] flex items-center justify-center font-medium">Biểu đồ doanh thu</p>
              <LineChart
                data={dashboard.revenue_data}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                color="#00855f"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
