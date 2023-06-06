package models

import (
	"time"
)

const TableNameMedicalReport = "PhieuKham"

type MedicalReport struct {
	ID        uint      `gorm:"column:MaPK" json:"id"`
	Diagnose  string    `gorm:"column:ChanDoan" json:"diagnose"`
	CreatedAt time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (MedicalReport) TableName() string {
	return TableNameMedicalReport
}

func GetMedicalReportList() []MedicalReport {
	medicalReports := []MedicalReport{}

	DB.Find(&medicalReports)

	return medicalReports
}
