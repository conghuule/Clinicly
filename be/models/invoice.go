package models

import (
	"clinic-management/types"
	"clinic-management/utils"
	"io"
	"net/http"
	"strconv"
	"time"

	generator "github.com/angelodlfrtr/go-invoice-generator"
	"github.com/go-pdf/fpdf"
	"gorm.io/gorm"
)

const TableNameInvoice = "HoaDon"

type Invoice struct {
	ID              uint           `gorm:"column:MaHD" json:"id"`
	Total           uint           `gorm:"column:TongTien" json:"total,omitempty"`
	PaymentStatus   bool           `gorm:"column:TTThanhToan" json:"payment_status"`
	DeliveryStatus  bool           `gorm:"column:TTGiaoThuoc" json:"delivery_status"`
	MedicalReportID *uint          `gorm:"column:MaPK" json:"medical_report_id"`
	MedicalReport   *MedicalReport `gorm:"foreignKey:MedicalReportID" json:"medical_report,omitempty"`
	CreatedAt       time.Time      `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt       time.Time      `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy       *uint          `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
}

func (Invoice) TableName() string {
	return TableNameInvoice
}

func (invoice *Invoice) Create() (*Invoice, error) {
	total := 0

	prescriptions := []Prescription{}
	err := DB.Preload("Medicine").
		Where(&Prescription{MedicalReportID: *invoice.MedicalReportID}).
		Find(&prescriptions).Error
	if err != nil {
		return nil, err
	}

	for _, value := range prescriptions {
		total += int(value.Quantity) * int(value.Medicine.Price)
	}

	fee, err := GetRegulationByID("GK")
	if err != nil {
		return nil, err
	}

	invoice.Total = uint(total) + uint(fee.Value)

	err = DB.Create(invoice).Error
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (invoice *Invoice) Update(updatedInvoice Invoice) (*Invoice, error) {
	err := DB.Model(invoice).Updates(updatedInvoice).Error
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (invoice *Invoice) Delete() (*Invoice, error) {
	err := DB.First(invoice).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(invoice)

	return invoice, nil
}

func GetInvoice(query ...func(*gorm.DB) *gorm.DB) ([]Invoice, error) {
	invoices := []Invoice{}

	err := DB.Scopes(query...).Find(&invoices).Error
	if err != nil {
		return nil, err
	}

	return invoices, nil
}

func (invoice *Invoice) GeneratePDF() (*fpdf.Fpdf, error) {
	medicalReport, err := GetMedicalReportByID(strconv.Itoa(int(*invoice.MedicalReportID)))
	if err != nil {
		return nil, err
	}

	prescriptions := []Prescription{}
	err = DB.Preload("Medicine").
		Where(&Prescription{MedicalReportID: *invoice.MedicalReportID}).
		Find(&prescriptions).Error
	if err != nil {
		return nil, err
	}

	fee, err := GetRegulationByID("GK")
	if err != nil {
		return nil, err
	}

	doc, _ := generator.New(generator.Invoice, &generator.Options{
		CurrencySymbol:    "vnd ",
		CurrencyPrecision: -1,
	})

	doc.SetRef(strconv.Itoa(int(invoice.ID)))
	doc.SetDate(utils.GetCurrentDateString())

	logoResponse, err := http.Get("https://raw.githubusercontent.com/longvu2907/Clinicly/main/be/assets/logo.png")
	if err != nil {
		return nil, err
	}

	logoBytes, err := io.ReadAll(logoResponse.Body)
	if err != nil {
		return nil, err
	}

	doc.SetCompany(&generator.Contact{
		Name: "Clinicly",
		Logo: logoBytes,
		Address: &generator.Address{
			Address:    "227 Nguyen Van Cu, Phuong 4, Quan 5",
			PostalCode: "800000",
			City:       "Ho Chi Minh",
			Country:    "Vietnam",
		},
	})

	doc.SetCustomer(&generator.Contact{
		Name: medicalReport.Patient.FullName,
		Address: &generator.Address{
			Address: medicalReport.Patient.Address,
		},
	})

	for _, v := range prescriptions {
		doc.AppendItem(&generator.Item{
			Name:        v.Medicine.Name,
			Description: v.Instruction,
			UnitCost:    strconv.Itoa(int(v.Medicine.Price)),
			Quantity:    strconv.Itoa(int(v.Quantity)),
		})
	}

	doc.AppendItem(&generator.Item{
		Name:     "Giá khám",
		UnitCost: strconv.Itoa(fee.Value),
		Quantity: "1",
	})

	pdf, err := doc.Build()
	if err != nil {
		return nil, err
	}

	return pdf, nil
}

func GetInvoiceByID(id string) (*Invoice, error) {
	invoice := &Invoice{}

	err := DB.Preload("MedicalReport").Where(`"MaHD" = ?`, id).First(invoice).Error
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func GetRevenueMetric(startDate, endDate time.Time) (revenueData []int, newRevenue *int, totalRevenue *int, err error) {
	revenueData = []int{}
	newRevenue = new(int)
	totalRevenue = new(int)

	var result []struct {
		Revenue int
		Date    time.Time
	}

	err = DB.Raw(`SELECT coalesce(SUM("TongTien"), 0), Date("NgayTao") FROM "HoaDon" 
	WHERE "NgayTao" BETWEEN ? AND ?
	AND "TTThanhToan" = true
	GROUP BY Date("NgayTao")
	ORDER BY DATE("NgayTao")`, startDate, endDate).Scan(&result).Error
	if err != nil {
		return nil, nil, nil, err
	}

	err = DB.Raw(`SELECT coalesce(SUM("TongTien"), 0) FROM "HoaDon"
	WHERE "TTThanhToan" = true`).Scan(totalRevenue).Error
	if err != nil {
		return nil, nil, nil, err
	}

	i := 0
	for date := startDate; date.Before(endDate); date = date.Add(time.Hour * 24 * time.Duration(1)) {
		if i < len(result) && date.Format(types.DateFormat) == result[i].Date.Format(types.DateFormat) {
			revenueData = append(revenueData, result[i].Revenue)
			i++
		} else {
			revenueData = append(revenueData, 0)
		}
	}

	*newRevenue = 0
	for _, v := range revenueData {
		*newRevenue += v
	}

	return revenueData, newRevenue, totalRevenue, nil
}
