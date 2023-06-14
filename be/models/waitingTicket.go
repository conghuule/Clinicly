package models

import (
	"time"
)

const TableNameWaitingTicket = "PhieuDoiKham"

type WaitingTicket struct {
	ListID    *uint     `gorm:"column:MaDS" json:"list_id"`
	PatientID *uint     `gorm:"column:MaBN" json:"patient_id"`
	No        uint      `gorm:"column:STT" json:"no"`
	Status    string    `gorm:"column:TrangThai" json:"status"`
	CreatedAt time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (WaitingTicket) TableName() string {
	return TableNameWaitingTicket
}

func GetTicketList() []WaitingTicket {
	Tickets := []WaitingTicket{}

	DB.Find(&Tickets)

	return Tickets
}
