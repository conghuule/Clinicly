package models

import (
	"time"
)

const TableNameUnit = "DonVi"

type Unit struct {
	ID        uint      `gorm:"column:MaDV" json:"id"`
	Name      string    `gorm:"column:TenDV" json:"name"`
	Info      string    `gorm:"column:ThongTin" json:"info"`
	CreatedAt time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Unit) TableName() string {
	return TableNameUnit
}

func GetUnitList() []Unit {
	units := []Unit{}

	DB.Find(&units)

	return units
}
