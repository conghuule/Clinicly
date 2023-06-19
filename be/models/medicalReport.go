package models

import (
	"time"
)

const TableNameMedicalReport = "PhieuKham"

type MedicalReport struct {
	ID           uint           `gorm:"column:MaPK" json:"id"`
	PatientID    uint           `gorm:"column:MaBN" json:"patient_id,omitempty"`
	DoctorID     uint           `gorm:"column:BacSi" json:"doctor_id,omitempty"`
	Doctor       *Staff         `gorm:"foreignKey:DoctorID" json:"doctor,omitempty"`
	Diagnose     string         `gorm:"column:ChanDoan" json:"diagnose,omitempty"`
	Prescription []Prescription `json:"prescription,omitempty"`
	Date         *time.Time     `gorm:"column:NgayKham" json:"date,omitempty"`
	CreatedAt    *time.Time     `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt    *time.Time     `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy    *uint          `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
}

func (MedicalReport) TableName() string {
	return TableNameMedicalReport
}

func GetMedicalReportList() []MedicalReport {
	medicalReports := []MedicalReport{}

	DB.Find(&medicalReports)

func (report *MedicalReport) AfterCreate(db *gorm.DB) (err error) {
	invoice := Invoice{
		PaymentStatus:   false,
		DeliveryStatus:  false,
		MedicalReportID: &report.ID,
		UpdatedBy:       report.UpdatedBy,
	}

	invoice.Create(*report)

	return nil
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
	report := &MedicalReport{}

	err := DB.Where(`"MaPK" = ?`, id).
		Preload("Prescription").
		Preload("Doctor").First(&report).Error
	if err != nil {
		return nil, err
	}

	return report, nil
}
