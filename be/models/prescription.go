package models

import (
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

const TableNamePrescription = "DonThuoc"

type Prescription struct {
	MedicalReportID uint       `gorm:"column:MaPK" json:"medical_report_id"`
	MedicineID      string     `gorm:"column:MaThuoc" json:"medicine_id"`
	Quantity        uint       `gorm:"column:SoLuong" json:"quantity"`
	Instruction     string     `gorm:"column:CachDung" json:"instruction"`
	CreatedAt       *time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt       *time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy       *uint      `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Prescription) TableName() string {
	return TableNamePrescription
}

func (prescription *Prescription) BeforeCreate(db *gorm.DB) (err error) {
	db.Statement.AddClause(clause.OnConflict{
		DoNothing: true,
	})

	return nil
}

func GetPrescriptionList() []Prescription {
	Prescriptions := []Prescription{}

	DB.Find(&Prescriptions)

	return Prescriptions
}
