package models

import (
	"strconv"
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

func (patient *Patient) CreatePatient() (*Patient, error) {
	err := DB.Create(&patient).Error

	if err != nil {
		return nil, err
	}

	return patient, nil
}

func GetPatient() ([]Patient, error) {
	patients := []Patient{}

	err := DB.Find(&patients).Error
	if err != nil {
		return nil, err
	}

	return patients, nil
}

func GetPatientByID(id string) (*Patient, error) {
	ID, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}
	patient := &Patient{}

	err = DB.Where(Patient{ID: uint(ID)}).Find(patient).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}
