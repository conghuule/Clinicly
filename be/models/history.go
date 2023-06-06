package models

import (
	"time"
)

const TableNameHistory = "LichSuKham"

type History struct {
	PatientID       *uint     `gorm:"column:MaBN" json:"patient_id"`
	MedicalReportID *uint     `gorm:"column:MaPK" json:"medical_report_id"`
	Note            string    `gorm:"column:GhiChu" json:"note"`
	Date            time.Time `gorm:"column:NgayKham" json:"date"`
	CreatedAt       time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt       time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy       *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (History) TableName() string {
	return TableNameHistory
}

func GetHistoryList() []History {
	Historys := []History{}

	DB.Find(&Historys)

	return Historys
}
