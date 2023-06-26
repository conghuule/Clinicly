package models

import (
	"clinic-management/types"
	"io/ioutil"
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

func (invoice *Invoice) Create(report MedicalReport) (*Invoice, error) {
	total := 0
	medicineIDList := []string{}
	medicines := []Medicine{}
	medicinePrice := map[string]uint{}

	for _, value := range report.Prescription {
		medicineIDList = append(medicineIDList, value.MedicineID)
	}

	DB.Where(medicineIDList).Find(&medicines)

	for _, value := range medicines {
		medicinePrice[value.ID] = value.Price
	}

	for _, value := range report.Prescription {
		total += int(value.Quantity) * int(medicinePrice[value.MedicineID])
	}

	costReg, err := GetRegulationByID("GK")
	if err != nil {
		return nil, err
	}

	invoice.Total = uint(total) + uint(costReg.Value)

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

	DB.Delete(&invoice)

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
	medicineIDList := []string{}
	medicines := []Medicine{}
	medicinePrice := map[string]uint{}

	for _, value := range report.Prescription {
		medicineIDList = append(medicineIDList, value.MedicineID)
	}

	DB.Where(medicineIDList).Find(&medicines)

	for _, value := range medicines {
		medicinePrice[value.ID] = value.Price
	}

	for _, value := range report.Prescription {
		total += int(value.Quantity) * int(medicinePrice[value.MedicineID])
	}

	costReg, err := GetRegulationByID("GK")
	if err != nil {
		return nil, err
	}

	doc, _ := generator.New(generator.Invoice, &generator.Options{
		CurrencySymbol: "vnd ",
	})

	doc.SetRef("1")
	doc.SetDate("02/03/2021")

	logoBytes, err := ioutil.ReadFile("./assets/logo.png")
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
		Name: "Test Customer",
		Address: &generator.Address{
			Address: "89 Rue de Paris",
		},
	})

	for i := 0; i < 3; i++ {
		doc.AppendItem(&generator.Item{
			Name:        "Cupcake ipsum dolor sit amet bonbon, coucou bonbon lala jojo, mama titi toto",
			Description: "Cupcake ipsum dolor sit amet bonbon, Cupcake ipsum dolor sit amet bonbon, Cupcake ipsum dolor sit amet bonbon",
			UnitCost:    "99876.89",
			Quantity:    "2",
		})
	}

	doc.AppendItem(&generator.Item{
		Name:     "Test",
		UnitCost: "99876.89",
		Quantity: "2",
	})

	doc.AppendItem(&generator.Item{
		Name:     "Test",
		UnitCost: "3576.89",
		Quantity: "2",
	})

	doc.AppendItem(&generator.Item{
		Name:     "Test",
		UnitCost: "889.89",
		Quantity: "2",
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
	for date := startDate; date.Before(endDate.Add(time.Hour * 24 * time.Duration(1))); date = date.Add(time.Hour * 24 * time.Duration(1)) {
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
