package models

import (
	"time"

	"gorm.io/gorm"
)

const TableNameMedicine = "Thuoc"

type Medicine struct {
	ID        string     `gorm:"column:MaThuoc" json:"id"`
	Name      string     `gorm:"column:TenThuoc" json:"name"`
	Quantity  uint       `gorm:"column:Soluong" json:"quantity"`
	Price     uint       `gorm:"column:DonGia" json:"price"`
	Info      string     `gorm:"column:ThongTin" json:"info"`
	Unit      string     `gorm:"column:DonVi" json:"unit"`
	CreatedAt *time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt *time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint      `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Medicine) TableName() string {
	return TableNameMedicine
}

func (medicine *Medicine) Create() (*Medicine, error) {
	err := DB.Create(medicine).Error
	if err != nil {
		return nil, err
	}

	return medicine, nil
}

func (medicine *Medicine) Update(updatedMedicine Medicine) (*Medicine, error) {
	err := DB.Model(medicine).Updates(updatedMedicine).Error
	if err != nil {
		return nil, err
	}

	return medicine, nil
}

func (medicine *Medicine) Delete() (*Medicine, error) {
	err := DB.First(&medicine).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(medicine)

	return medicine, nil
}

func GetMedicine(query ...func(*gorm.DB) *gorm.DB) ([]Medicine, error) {
	medicines := []Medicine{}

	err := DB.Scopes(query...).Find(&medicines).Error
	if err != nil {
		return nil, err
	}

	return medicines, nil
}
