package models

import (
	"time"
)

const TableNamePrescription = "DonThuoc"

type Prescription struct {
	MedicalReportID uint       `gorm:"column:MaPK" json:"medical_report_id"`
	MedicineID      string     `gorm:"column:MaThuoc" json:"medicine_id"`
	Quantity        uint       `gorm:"column:SoLuong" json:"quantity,omitempty"`
	Instruction     string     `gorm:"column:CachDung" json:"instruction,omitempty"`
	CreatedAt       *time.Time `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt       *time.Time `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy       *uint      `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
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

func (prescription *Prescription) AfterCreate(db *gorm.DB) (err error) {
	medicine, err := GetMedicineByID(prescription.MedicineID)
	if err != nil {
		return err
	}

	updatedMedicine := Medicine{
		Quantity: medicine.Quantity - prescription.Quantity,
	}

	_, err = medicine.Update(updatedMedicine)
	if err != nil {
		return err
	}

	return nil
}
