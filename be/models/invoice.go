package models

import (
	"time"
)

const TableNameInvoice = "HoaDon"

type Invoice struct {
	ID             uint      `gorm:"column:MaHD" json:"id"`
	Total          uint      `gorm:"column:TongTien" json:"total"`
	PaymentStatus  bool      `gorm:"column:TTThanhToan" json:"payment_status"`
	DeliveryStatus bool      `gorm:"column:TTGiaoThuoc" json:"delivery_status"`
	MedicalReport  *uint     `gorm:"column:MaPK" json:"medical_report"`
	CreatedAt      time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt      time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy      *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Invoice) TableName() string {
	return TableNameInvoice
}

func GetInvoiceList() []Invoice {
	invoices := []Invoice{}

	DB.Find(&invoices)

	return invoices
}
