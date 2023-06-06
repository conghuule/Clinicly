package models

import (
	"time"
)

const TableNameMedicine = "Thuoc"

type Medicine struct {
	ID        uint      `gorm:"column:MaThuoc" json:"id"`
	Name      string    `gorm:"column:TenThuoc" json:"name"`
	Quantity  uint      `gorm:"column:Soluong" json:"quantity"`
	Price     uint      `gorm:"column:DonGia" json:"price"`
	Info      string    `gorm:"column:ThongTin" json:"info"`
	Unit      *uint     `gorm:"column:MaDV" json:"unit"`
	CreatedAt time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Medicine) TableName() string {
	return TableNameMedicine
}

func GetMedicineList() []Medicine {
	medicines := []Medicine{}

	DB.Find(&medicines)

	return medicines
}
