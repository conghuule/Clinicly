package models

import (
	"clinic-management/types"
	"time"

	"gorm.io/gorm"
)

const TableNamePatient = "BenhNhan"

type Patient struct {
	ID           uint       `gorm:"column:MaBN" json:"id"`
	FullName     string     `gorm:"column:HoTen" json:"full_name,omitempty"`
	Gender       string     `gorm:"column:GioiTinh" json:"gender,omitempty"`
	BirthDate    *time.Time `gorm:"column:NgaySinh" json:"birth_date,omitempty"`
	IdentityCard string     `gorm:"column:CCCD" json:"identity_card,omitempty"`
	Address      string     `gorm:"column:DiaChi" json:"address,omitempty"`
	PhoneNumber  string     `gorm:"column:SDT" json:"phone_number,omitempty"`
	CreatedAt    *time.Time `gorm:"column:NgayTao" json:"created_at,omitempty"`
	UpdatedAt    *time.Time `gorm:"column:NgayCapNhat" json:"updated_at,omitempty"`
	UpdatedBy    *uint      `gorm:"column:CapNhatBoi" json:"updated_by,omitempty"`
}

func (Patient) TableName() string {
	return TableNamePatient
}

func (patient *Patient) Create() (*Patient, error) {
	err := DB.Create(patient).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (patient *Patient) Update(updatedStaff Patient) (*Patient, error) {
	err := DB.Model(patient).Updates(updatedStaff).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (patient *Patient) Delete() (*Patient, error) {
	err := DB.First(patient).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(patient)

	return patient, nil
}

func GetPatient(query ...func(*gorm.DB) *gorm.DB) ([]Patient, error) {
	patients := []Patient{}

	err := DB.Scopes(query...).Find(&patients).Error
	if err != nil {
		return nil, err
	}

	return patients, nil
}

func GetPatientByID(id string) (*Patient, error) {
	patient := &Patient{}

	err := DB.Where(`"MaBN" = ?`, id).First(patient).Error
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func GetPatientMetric(startDate, endDate time.Time) (patientData []int, newPatient *int, totalPatient *int, err error) {
	patientData = []int{}
	newPatient = new(int)
	totalPatient = new(int)

	var result []struct {
		Count int
		Date  time.Time
	}

	err = DB.Raw(`SELECT Count(*), Date("NgayTao") FROM "BenhNhan" 
	WHERE "NgayTao" BETWEEN ? AND ?
	GROUP BY Date("NgayTao")
	ORDER BY DATE("NgayTao")`, startDate, endDate).Scan(&result).Error
	if err != nil {
		return nil, nil, nil, err
	}

	err = DB.Raw(`SELECT Count(*) FROM "BenhNhan"`).Scan(totalPatient).Error
	if err != nil {
		return nil, nil, nil, err
	}

	i := 0
	for date := startDate; date.Before(endDate.Add(time.Hour * 24 * time.Duration(1))); date = date.Add(time.Hour * 24 * time.Duration(1)) {
		if i < len(result) && date.Format(types.DateFormat) == result[i].Date.Format(types.DateFormat) {
			patientData = append(patientData, result[i].Count)
			i++
		} else {
			patientData = append(patientData, 0)
		}
	}

	*newPatient = 0
	for _, v := range patientData {
		*newPatient += v
	}

	return patientData, newPatient, totalPatient, nil
}
