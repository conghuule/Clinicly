package models

import (
	"time"
)

const TableNameMedicine = "Thuoc"

type Medicine struct {
	ID        string     `gorm:"column:MaThuoc" json:"id"`
	Name      string     `gorm:"column:TenThuoc" json:"name"`
	Quantity  uint       `gorm:"column:SoLuong" json:"quantity,omitempty"`
	Price     uint       `gorm:"column:DonGia" json:"price,omitempty"`
	Info      string     `gorm:"column:ThongTin" json:"info,omitempty"`
	Unit      string     `gorm:"column:DonVi" json:"unit,omitempty"`
	CreatedAt *time.Time `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt *time.Time `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy *uint      `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
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

	err := DB.Select("ID", "Name", "Quantity", "Price").Scopes(query...).Find(&medicines).Error
	if err != nil {
		return nil, err
	}

	return medicines, nil
}

func GetMedicineByID(id string) (*Medicine, error) {
	medicine := &Medicine{}

	err := DB.Where(`"MaThuoc" = ?`, id).First(&medicine).Error
	if err != nil {
		return nil, err
	}

	return medicine, nil
}
