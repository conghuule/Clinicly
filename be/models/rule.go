package models

import (
	"time"
)

const TableNameRule = "QuyDinh"

type Rule struct {
	ID        uint                        `gorm:"column:MaQD" json:"id"`
	Name      string                      `gorm:"column:TenQD" json:"name"`
	Value     map[interface{}]interface{} `gorm:"column:GiaTri" json:"value"`
	CreatedAt time.Time                   `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time                   `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint                       `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Rule) TableName() string {
	return TableNameRule
}

func GetRuleList() []Rule {
	Rules := []Rule{}

	DB.Find(&Rules)

	return Rules
}
