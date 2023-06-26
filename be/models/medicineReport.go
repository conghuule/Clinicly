package models

import (
	"time"

	"gorm.io/gorm"
)

const TableNameMedicineImport = "PhieuNhapThuoc"

type MedicineReport struct {
	ID         uint       `gorm:"column:MaPN" json:"id"`
	MedicineID string     `gorm:"column:MaThuoc" json:"medicine_id"`
	Medicine   *Medicine  `json:"medicine,omitempty"`
	Quantity   uint       `gorm:"column:SoLuong" json:"quantity"`
	Date       *time.Time `gorm:"column:NgayNhap" json:"date"`
	CreatedAt  *time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt  *time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy  *uint      `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (MedicineReport) TableName() string {
	return TableNameMedicineImport
}

func (report *MedicineReport) Create() (*MedicineReport, error) {
	err := DB.Create(report).Error
	if err != nil {
		return nil, err
	}

	return report, nil
}

func (report *MedicineReport) AfterCreate(db *gorm.DB) error {
	medicine, err := GetMedicineByID(report.MedicineID)
	if err != nil {
		return err
	}

	updatedMedicine := Medicine{
		Quantity:  medicine.Quantity + report.Quantity,
		UpdatedBy: report.UpdatedBy,
	}

	medicine.Update(updatedMedicine)

	return nil
}

func (report *MedicineReport) Update(updatedReport MedicineReport) (*MedicineReport, error) {
	err := DB.Model(report).Updates(updatedReport).Error
	if err != nil {
		return nil, err
	}

	return report, nil
}

func (report *MedicineReport) Delete() (*MedicineReport, error) {
	err := DB.First(report).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(report)

	return report, nil
}

func GetMedicineReport(query ...func(*gorm.DB) *gorm.DB) ([]MedicineReport, error) {
	reports := []MedicineReport{}

	err := DB.Scopes(query...).Find(&reports).Error
	if err != nil {
		return nil, err
	}

	return reports, nil
}

func GetMedicineReportByID(id string) (*MedicineReport, error) {
	report := &MedicineReport{}

	err := DB.Preload("Medicine").Where(`"MaPN" = ?`, id).First(report).Error
	if err != nil {
		return nil, err
	}

	return report, nil
}
