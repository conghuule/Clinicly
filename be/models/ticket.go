package models

import (
	"time"
)

const TableNameTicket = "PhieuDoiKham"

type Ticket struct {
	ListID    *uint     `gorm:"column:MaDS" json:"list_id"`
	PatientID *uint     `gorm:"column:MaBN" json:"patient_id"`
	No        uint      `gorm:"column:STT" json:"no"`
	Status    string    `gorm:"column:TrangThai" json:"status"`
	CreatedAt time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint     `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Ticket) TableName() string {
	return TableNameTicket
}

func GetTicketList() []Ticket {
	Tickets := []Ticket{}

	DB.Find(&Tickets)

	return Tickets
}
