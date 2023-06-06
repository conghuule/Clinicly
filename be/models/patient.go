package models

import (
	"time"
)

const TableNamePatient = "BenhNhan"

type Patient struct {
	ID           uint      `gorm:"column:MaBN" json:"id"`
	FullName     string    `gorm:"column:HoTen" json:"full_name"`
	Gender       string    `gorm:"column:GioiTinh" json:"gender"`
	BirthDate    time.Time `gorm:"column:NgaySinh" json:"birth_date"`
	IdentityCard string    `gorm:"column:CCCD" json:"identity_card"`
	Address      string    `gorm:"column:DiaChi" json:"address"`
	PhoneNumber  string    `gorm:"column:SDT" json:"phone_number"`
	CreatedAt    time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy    *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Patient) TableName() string {
	return TableNamePatient
}

func GetPatientList() []Patient {
	patients := []Patient{}

	DB.Find(&patients)

	return patients
}
