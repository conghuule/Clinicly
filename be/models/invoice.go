package models

import (
	"time"

	"gorm.io/gorm"
)

const TableNameInvoice = "HoaDon"

type Invoice struct {
	ID              uint           `gorm:"column:MaHD" json:"id"`
	Total           uint           `gorm:"column:TongTien" json:"total,omitempty"`
	PaymentStatus   bool           `gorm:"column:TTThanhToan" json:"payment_status"`
	DeliveryStatus  bool           `gorm:"column:TTGiaoThuoc" json:"delivery_status"`
	MedicalReportID *uint          `gorm:"column:MaPK" json:"medical_report_id"`
	MedicalReport   *MedicalReport `gorm:"foreignKey:MedicalReportID" json:"medical_report,omitempty"`
	CreatedAt       time.Time      `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt       time.Time      `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy       *uint          `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
}

func (Invoice) TableName() string {
	return TableNameInvoice
}

func (invoice *Invoice) Create(report MedicalReport) (*Invoice, error) {
	total := 0
	medicineIDList := []string{}
	medicines := []Medicine{}
	medicinePrice := map[string]uint{}

	for _, value := range report.Prescription {
		medicineIDList = append(medicineIDList, value.MedicineID)
	}

	DB.Where(medicineIDList).Find(&medicines)

	for _, value := range medicines {
		medicinePrice[value.ID] = value.Price
	}

	for _, value := range report.Prescription {
		total += int(value.Quantity) * int(medicinePrice[value.MedicineID])
	}

	invoice.Total = uint(total)

	err := DB.Omit("MedicalReport").Create(invoice).Error
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (invoice *Invoice) AfterCreate(db *gorm.DB) error {
	err := db.Model(invoice).Update("MaPK", invoice.MedicalReportID).Error
	if err != nil {
		return err
	}

	return nil
}

func (invoice *Invoice) Update(updatedInvoice Invoice) (*Invoice, error) {
	err := DB.Model(invoice).Updates(updatedInvoice).Error
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (invoice *Invoice) Delete() (*Invoice, error) {
	err := DB.First(invoice).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(&invoice)

	return invoice, nil
}

func GetInvoice(query ...func(*gorm.DB) *gorm.DB) ([]Invoice, error) {
	invoices := []Invoice{}

	err := DB.Scopes(query...).Find(&invoices).Error
	if err != nil {
		return nil, err
	}

	return invoices, nil
}

func GetInvoiceByID(id string) (*Invoice, error) {
	invoice := &Invoice{}

	err := DB.Preload("MedicalReport").Where(`"MaHD" = ?`, id).First(invoice).Error
	if err != nil {
		return nil, err
	}

	return invoice, nil
}
