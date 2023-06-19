package models

import (
	"time"
)

const TableNameWaitingList = "DSDoiKham"

type WaitingList struct {
	ID        uint      `gorm:"column:MaDS" json:"id"`
	Date      time.Time `gorm:"column:NgayKham" json:"date"`
	Quantity  uint      `gorm:"column:SoLuong" json:"quantity"`
	CreatedAt time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (WaitingList) TableName() string {
	return TableNameWaitingList
}

func GetWaitingListList() []WaitingList {
	WaitingLists := []WaitingList{}

	DB.Find(&WaitingLists)

	return WaitingLists
}
