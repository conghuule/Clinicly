package models

import (
	"clinic-management/utils"
	"clinic-management/utils/query"
	"time"

	"gorm.io/gorm"
)

const TableNameWaitingTicket = "PhieuDoiKham"

type Ticket struct {
	ID        uint       `gorm:"column:MaPDK" json:"id"`
	PatientID uint       `gorm:"column:MaBN" json:"patient_id"`
	Patient   *Patient   `gorm:"foreignKey:PatientID" json:"patient"`
	Number    uint       `gorm:"column:STT" json:"number"`
	Status    string     `gorm:"column:TrangThai" json:"status"`
	Date      *time.Time `gorm:"column:NgayKham" json:"date"`
	CreatedAt *time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt *time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy *uint      `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Ticket) TableName() string {
	return TableNameWaitingTicket
}

func (ticket *Ticket) BeforeCreate(tx *gorm.DB) error {
	lastTicket := &Ticket{}

	err := DB.Scopes(query.QueryByDate("NgayKham", utils.GetCurrentDateString())).
		Order(`"NgayTao" desc`).First(lastTicket).Error
	if err != nil {
		ticket.Number = 1
	}

	ticket.Number = lastTicket.Number + 1

	return nil
}

func (ticket *Ticket) Create() (*Ticket, error) {
	err := DB.Create(ticket).Error
	if err != nil {
		return nil, err
	}

	return ticket, nil
}

func (ticket *Ticket) Update(updatedTicket Ticket) (*Ticket, error) {
	err := DB.Model(ticket).Updates(updatedTicket).Error
	if err != nil {
		return nil, err
	}

	return ticket, nil
}

func (ticket *Ticket) Delete() (*Ticket, error) {
	err := DB.First(ticket).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(&ticket)

	return ticket, nil
}

func GetTicket(query ...func(*gorm.DB) *gorm.DB) ([]Ticket, error) {
	tickets := []Ticket{}

	err := DB.Preload("Patient").Scopes(query...).Find(&tickets).Error
	if err != nil {
		return nil, err
	}

	return tickets, nil
}

func GetTicketByID(id string) (*Ticket, error) {
	ticket := &Ticket{}

	err := DB.Where(`"MaPDK" = ?`, id).First(ticket).Error
	if err != nil {
		return nil, err
	}

	return ticket, nil
}
