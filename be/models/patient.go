package models

import (
	"strconv"
	"time"

	"gorm.io/gorm"
)

const TableNamePatient = "BenhNhan"

type Patient struct {
	ID           uint       `gorm:"column:MaBN" json:"id"`
	FullName     string     `gorm:"column:HoTen" json:"full_name,omitempty"`
	Gender       string     `gorm:"column:GioiTinh" json:"gender,omitempty"`
	BirthDate    *time.Time `gorm:"column:NgaySinh" json:"birth_date,omitempty"`
	IdentityCard string     `gorm:"column:CCCD" json:"identity_card,omitempty"`
	Address      string     `gorm:"column:DiaChi" json:"address,omitempty"`
	PhoneNumber  string     `gorm:"column:SDT" json:"phone_number,omitempty"`
	CreatedAt    *time.Time `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt    *time.Time `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy    *uint      `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
}

func (Patient) TableName() string {
	return TableNamePatient
}

func (patient *Patient) Create() (*Patient, error) {
	err := DB.Create(&patient).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (patient *Patient) Update(updatedStaff Patient) (*Patient, error) {
	err := DB.Model(&patient).Updates(updatedStaff).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (patient *Patient) Delete() (*Patient, error) {
	err := DB.First(&patient).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func GetPatient(query ...func(*gorm.DB) *gorm.DB) ([]Patient, error) {
	patients := []Patient{}

	err := DB.Scopes(query...).Find(&patients).Error
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

	err = DB.Where(Patient{ID: uint(ID)}).First(patient).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}
