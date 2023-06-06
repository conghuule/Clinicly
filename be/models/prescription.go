package models

import (
	"time"
)

const TableNamePrescription = "DonThuoc"

type Prescription struct {
	MedicalReportID *uint     `gorm:"column:MaPK" json:"medical_report_id"`
	MedicineID      *uint     `gorm:"column:MaThuoc" json:"medicine_id"`
	Quantity        uint      `gorm:"column:SoLuong" json:"quantity"`
	Instruction     string    `gorm:"column:CachDung" json:"instruction"`
	CreatedAt       time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt       time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy       *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Prescription) TableName() string {
	return TableNamePrescription
}

func GetPrescriptionList() []Prescription {
	Prescriptions := []Prescription{}

	DB.Find(&Prescriptions)

	return Prescriptions
}
