package models

import (
	"time"
)

const TableNameMedicineImport = "PhieuNhapThuoc"

type MedicineReport struct {
	ID         uint      `gorm:"column:MaPN" json:"id"`
	MedicineID *uint     `gorm:"column:MaThuoc" json:"medicine_id"`
	Quantity   uint      `gorm:"column:Soluong" json:"quantity"`
	Date       time.Time `gorm:"column:NgayNhap" json:"date"`
	CreatedAt  time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt  time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy  *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (MedicineReport) TableName() string {
	return TableNameMedicineImport
}

func GetMedicineImportList() []MedicineReport {
	MedicineImports := []MedicineReport{}

	DB.Find(&MedicineImports)

	return MedicineImports
}
