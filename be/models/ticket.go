package models

import (
	"clinic-management/types"
	"clinic-management/utils"
	"errors"
	"time"

	"gorm.io/gorm"
)

const TableNameWaitingTicket = "PhieuDoiKham"

type Ticket struct {
	ID        uint       `gorm:"column:MaPDK" json:"id"`
	PatientID uint       `gorm:"column:MaBN" json:"patient_id"`
	Patient   *Patient   `gorm:"foreignKey:PatientID" json:"patient,omitempty"`
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
	todayTicket := []Ticket{}

	err := DB.Raw(`SELECT * FROM "PhieuDoiKham" 
	WHERE DATE("NgayKham") = DATE(?)
	ORDER BY "NgayTao" DESC`, utils.GetCurrentDateString()).Scan(&todayTicket).Error
	if err != nil || len(todayTicket) == 0 {
		ticket.Number = 1
	} else {
		ticket.Number = todayTicket[0].Number + 1
	}

	maxTicketReg, err := GetRegulationByID("SLLKTD")
	if len(todayTicket) >= maxTicketReg.Value || err != nil {
		return errors.New("the maximum number of tickets per day has been exceeded")
	}

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

	DB.Delete(ticket)

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

func GetTicketMetric(startDate, endDate time.Time) (ticketData []int, newTicket *int, totalTicket *int, err error) {
	ticketData = []int{}
	newTicket = new(int)
	totalTicket = new(int)

	var result []struct {
		Count int
		Date  time.Time
	}

	err = DB.Raw(`SELECT Count(*), Date("NgayTao") FROM "PhieuDoiKham" 
	WHERE "NgayTao" BETWEEN ? AND ?
	GROUP BY Date("NgayTao")
	ORDER BY DATE("NgayTao")`, startDate, endDate).Scan(&result).Error
	if err != nil {
		return nil, nil, nil, err
	}

	err = DB.Raw(`SELECT Count(*) FROM "PhieuDoiKham"`).Scan(totalTicket).Error
	if err != nil {
		return nil, nil, nil, err
	}

	i := 0
	for date := startDate; date.Before(endDate.Add(time.Hour * 24 * time.Duration(1))); date = date.Add(time.Hour * 24 * time.Duration(1)) {
		if i < len(result) && date.Format(types.DateFormat) == result[i].Date.Format(types.DateFormat) {
			ticketData = append(ticketData, result[i].Count)
			i++
		} else {
			ticketData = append(ticketData, 0)
		}
	}

	*newTicket = 0
	for _, v := range ticketData {
		*newTicket += v
	}

	return ticketData, newTicket, totalTicket, nil
}
