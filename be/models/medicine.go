package models

import (
	"clinic-management/types"
	"time"

	"gorm.io/gorm"
)

const TableNameMedicine = "Thuoc"

type Medicine struct {
	ID        string     `gorm:"column:MaThuoc" json:"id"`
	Name      string     `gorm:"column:TenThuoc" json:"name"`
	Quantity  uint       `gorm:"column:SoLuong" json:"quantity"`
	Price     uint       `gorm:"column:DonGia" json:"price"`
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

	err := DB.Select("ID", "Name", "Quantity", "Price", "Unit").Scopes(query...).Find(&medicines).Error
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

func GetMedicineMetric(startDate, endDate time.Time) (medicineData []int, newMedicine *int, totalMedicine *int, err error) {
	medicineData = []int{}
	newMedicine = new(int)
	totalMedicine = new(int)

	var result []struct {
		Count int
		Date  time.Time
	}

	err = DB.Raw(`SELECT coalesce(SUM("SoLuong"), 0) Count, Date(hd."NgayTao") FROM "HoaDon" hd
	JOIN "DonThuoc" dt ON hd."MaPK" = dt."MaPK"
	WHERE hd."NgayTao" BETWEEN ? AND ?
	AND "TTGiaoThuoc" = true
	GROUP BY Date(hd."NgayTao")
	ORDER BY DATE(hd."NgayTao")`, startDate, endDate).Scan(&result).Error
	if err != nil {
		return nil, nil, nil, err
	}

	err = DB.Raw(`SELECT coalesce(SUM("SoLuong"), 0) FROM "HoaDon" hd
	JOIN "DonThuoc" dt ON hd."MaPK" = dt."MaPK"
	WHERE "TTGiaoThuoc" = true`).Scan(totalMedicine).Error
	if err != nil {
		return nil, nil, nil, err
	}

	i := 0
	for date := startDate; date.Before(endDate); date = date.Add(time.Hour * 24 * time.Duration(1)) {
		if i < len(result) && date.Format(types.DateFormat) == result[i].Date.Format(types.DateFormat) {
			medicineData = append(medicineData, result[i].Count)
			i++
		} else {
			medicineData = append(medicineData, 0)
		}
	}

	*newMedicine = 0
	for _, v := range medicineData {
		*newMedicine += v
	}

	return medicineData, newMedicine, totalMedicine, nil
}
