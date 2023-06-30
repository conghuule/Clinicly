import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import { AuthContext } from '../../context/authContext';
import patientApi from '../../services/patientApi';
import { MEDICAL_REPORT_COLUMN, PRESCRIPTION_COLUMN } from '../../utils/constants';
import PrescriptionModal from '../../components/Modal/PrescriptionModal';
import medicalReportAPI from '../../services/medicalReportApi';
import { notify } from '../../components/Notification/Notification';
import waitingListApi from '../../services/waitingListApi';

export default function CreateMedicalReport() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { id, ticket_id } = useParams();
  const [information, setInformation] = useState({
    patient_id: id,
    patient_name: '',
    date: dayjs().format('YYYY-MM-DD'),
    doctor_name: auth.full_name,
  });
  const [prescription, setPrescription] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [medicineSelected, setMedicineSelected] = useState(null);

  const removeMedicine = (medicine_id) => {
    setPrescription((prev) => prev.filter((v) => v.id !== medicine_id));
  };

  const addMedicine = (value) => {
    setPrescription((prev) => [
      ...prev.filter((v) => v.id !== value.medicine_id),
      {
        ...value.medicine,
        ...value,
        action: {
          modify: () => {
            setMedicineSelected(value);
            setOpenModal(true);
          },
          remove: () => removeMedicine(value.medicine_id),
        },
      },
    ]);
    setOpenModal(false);
  };

  const getPatient = useCallback(async () => {
    const response = await patientApi.getById(id);
    setInformation((prev) => ({ ...prev, patient_name: response.data.full_name }));
  }, [id]);
  useEffect(() => {
    getPatient();
  }, [getPatient]);

  const onSubmit = async ({ diagnose }) => {
    try {
      await medicalReportAPI.createMedicalReport({
        diagnose,
        doctor_id: auth.id,
        patient_id: Number(id),
        prescription: prescription.map((p, index) => ({
          instruction: p.instruction,
          medicine_id: p.medicine_id,
          quantity: Number(p.quantity),
          index: index + 1,
        })),
      });

      await waitingListApi.update(ticket_id, { status: 3 });

      navigate('/examination_list');

      notify({ type: 'success', mess: 'Tạo phiếu khám thành công' });
    } catch (err) {
      console.log(err);
      notify({ type: 'error', mess: 'Tạo phiếu khám thất bại' });
    }
  };

  return (
    <Form onFinish={onSubmit}>
      <HeaderBar title="Bệnh nhân" icon={faHospitalUser} image="" name={auth.full_name} role={auth.role} />
      <div className="mt-[20px] flex justify-between">
        <Button type="primary" onClick={() => navigate(-1)}>
          Trở về
        </Button>
        <div className="flex">
          <Button type="primary" htmlType="submit">
            Hoàn tất
          </Button>
        </div>
      </div>

      <div className="py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-[24px] font-semibold">Thông tin</span>
          <Table dataSource={[information]} columns={MEDICAL_REPORT_COLUMN} pagination={false} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[24px] font-semibold">Chẩn đoán</span>
          <Form.Item name="diagnose">
            <TextArea rows={4} placeholder="Nhập chẩn đoán" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between align-middle">
            <span className="text-[24px] font-semibold">Đơn thuốc</span>
            <Button
              size="middle"
              type="primary"
              onClick={() => {
                setMedicineSelected(null);
                setOpenModal(true);
              }}
            >
              Thêm thuốc
            </Button>
          </div>
          <Table dataSource={prescription} columns={PRESCRIPTION_COLUMN} pagination={false} />
        </div>
      </div>
      <PrescriptionModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={addMedicine}
        medicineData={medicineSelected}
      />
    </Form>
  );
}
