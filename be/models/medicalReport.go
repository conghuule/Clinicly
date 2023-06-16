package models

import (
	"time"

	"gorm.io/gorm"
)

const TableNameMedicalReport = "PhieuKham"

type MedicalReport struct {
	ID           uint           `gorm:"column:MaPK" json:"id"`
	PatientID    uint           `gorm:"column:MaBN" json:"patient_id"`
	DoctorID     uint           `gorm:"column:BacSi" json:"doctor_id"`
	Doctor       *Staff         `gorm:"foreignKey:DoctorID" json:"doctor"`
	Diagnose     string         `gorm:"column:ChanDoan" json:"diagnose"`
	Prescription []Prescription `json:"prescription"`
	Date         *time.Time     `gorm:"column:NgayKham" json:"date"`
	CreatedAt    *time.Time     `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt    *time.Time     `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy    *uint          `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (MedicalReport) TableName() string {
	return TableNameMedicalReport
}

func (report *MedicalReport) Create() (*MedicalReport, error) {
	err := DB.Create(report).Error
	if err != nil {
		return nil, err
	}

	return report, nil
}

func (report *MedicalReport) Update(updatedReport MedicalReport) (*MedicalReport, error) {
	err := DB.Model(report).Updates(updatedReport).Error
	if err != nil {
		return nil, err
	}

	return report, nil
}

func (report *MedicalReport) Delete() (*MedicalReport, error) {
	err := DB.First(report).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(&report)

	return report, nil
}

func GetMedicalReport(query ...func(*gorm.DB) *gorm.DB) ([]MedicalReport, error) {
	reports := []MedicalReport{}

	err := DB.Scopes(query...).
		Preload("Doctor", func(db *gorm.DB) *gorm.DB {
			return db.Select("ID", "FullName")
		}).Find(&reports).Error
	if err != nil {
		return nil, err
	}

	return reports, nil
}

func GetMedicalReportByID(id string) (*MedicalReport, error) {
	reports := &MedicalReport{}

	err := DB.Where(`"MaPK" = ?`, id).
		Preload("Prescription").
		Preload("Doctor").Find(&reports).Error
	if err != nil {
		return nil, err
	}

	return reports, nil
}
