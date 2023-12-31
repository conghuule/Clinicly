package models

import (
	"time"

	"gorm.io/gorm"
)

const TableNameRegulation = "QuyDinh"

type Regulation struct {
	ID        string     `gorm:"column:MaQD" json:"id"`
	Name      string     `gorm:"column:TenQD" json:"name"`
	Value     int        `gorm:"column:GiaTri" json:"value"`
	CreatedAt *time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt *time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint      `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Regulation) TableName() string {
	return TableNameRegulation
}

func (regulation *Regulation) CreateRegulation() (*Regulation, error) {
	err := DB.Create(&regulation).Error
	if err != nil {
		return nil, err
	}

	return regulation, nil
}

func (regulation *Regulation) UpdateRegulation(updatedRegulation Regulation) (*Regulation, error) {
	err := DB.Model(&regulation).Updates(updatedRegulation).Error
	if err != nil {
		return nil, err
	}

	return regulation, nil
}

func (regulation *Regulation) DeleteRegulation() (*Regulation, error) {
	err := DB.First(&regulation).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(regulation)

	return regulation, nil
}

func GetRegulation(query ...func(*gorm.DB) *gorm.DB) ([]Regulation, error) {
	regulations := []Regulation{}

	err := DB.Scopes(query...).Find(&regulations).Error
	if err != nil {
		return nil, err
	}

	return regulations, nil
}

func GetRegulationByID(id string) (*Regulation, error) {
	regulation := &Regulation{}

	err := DB.Where(Regulation{ID: id}).First(regulation).Error
	if err != nil {
		return nil, err
	}

	return regulation, nil
}
