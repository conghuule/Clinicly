import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import { AuthContext } from '../../context/authContext';
import medicalReportAPI from '../../services/medicalReportApi';
import { MEDICAL_REPORT_COLUMN, PRESCRIPTION_VIEW_COLUMN } from '../../utils/constants';

export default function MedicalReport() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { medical_report_id } = useParams();
  const [medicalReport, setMedicalReport] = useState({});

  const getMedicalReport = useCallback(async () => {
    const res = await medicalReportAPI.getMedicalReportDetail(medical_report_id);
    setMedicalReport(res.data);
  }, [medical_report_id]);

  useEffect(() => {
    getMedicalReport();
  }, [getMedicalReport]);

  return (
    <div>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name={auth.full_name} role={auth.role} />
      <div className="mt-[20px] flex justify-between">
        <Button type="primary" onClick={() => navigate(-1)}>
          Trở về
        </Button>
      </div>

      <div className="py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-[24px] font-semibold">Thông tin</span>
          <Table
            dataSource={[
              {
                patient_id: medicalReport.patient?.id,
                patient_name: medicalReport.patient?.full_name,
                date: medicalReport.date,
                doctor_name: medicalReport.doctor?.id,
              },
            ]}
            columns={MEDICAL_REPORT_COLUMN}
            pagination={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[24px] font-semibold">Chẩn đoán</span>
          <TextArea rows={4} placeholder="Nhập chẩn đoán" value={medicalReport.diagnose} />
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-[24px] font-semibold">Đơn thuốc</span>
          <Table
            dataSource={medicalReport.prescription?.map((p, index) => ({
              id: p.medicine?.id,
              name: p.medicine?.name,
              unit: p.medicine?.unit,
              quantity: p.quantity,
              instruction: p.instruction,
              index: index + 1,
            }))}
            columns={PRESCRIPTION_VIEW_COLUMN}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}
