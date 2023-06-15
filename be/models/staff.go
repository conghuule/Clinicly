package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const TableNameStaff = "NhanVien"

type Staff struct {
	ID           uint       `gorm:"column:MaNV" json:"id"`
	FullName     string     `gorm:"column:HoTen" json:"full_name"`
	BirthDate    *time.Time `gorm:"column:NgaySinh" json:"birth_date"`
	Gender       string     `gorm:"column:GioiTinh" json:"gender"`
	Address      string     `gorm:"column:DiaChi" json:"address"`
	IdentityCard string     `gorm:"column:CCCD" json:"identity_card"`
	PhoneNumber  string     `gorm:"column:SDT" json:"phone_number"`
	Email        string     `gorm:"column:Email" json:"email"`
	Role         string     `gorm:"column:LoaiNV" json:"role"`
	Salary       uint       `gorm:"column:MucLuong" json:"salary"`
	Status       string     `gorm:"column:TrangThai" json:"status"`
	Password     string     `gorm:"column:Password" json:"-"`
	CreatedAt    *time.Time `gorm:"column:NgayTao" json:"created_at"`
	UpdatedAt    *time.Time `gorm:"column:NgayCapNhat" json:"updated_at"`
	UpdatedBy    *uint      `gorm:"column:CapNhatBoi" json:"updated_by"`
}

func (Staff) TableName() string {
	return TableNameStaff
}

func (staff *Staff) BeforeCreate(tx *gorm.DB) error {
	hashedPassword, err := hashPassword(staff.Password)
	if err != nil {
		return err
	}

	staff.Password = hashedPassword

	return nil
}

func (staff *Staff) Create() (*Staff, error) {
	err := DB.Create(staff).Error
	if err != nil {
		return nil, err
	}

	return staff, nil
}

func (staff *Staff) Update(updatedStaff Staff) (*Staff, error) {
	if updatedStaff.Password != "" {
		hashedPassword, err := hashPassword(updatedStaff.Password)
		if err != nil {
			return nil, err
		}

		updatedStaff.Password = hashedPassword
	}

	err := DB.Model(staff).Updates(updatedStaff).Error
	if err != nil {
		return nil, err
	}

	return staff, nil
}

func (staff *Staff) Delete() (*Staff, error) {
	err := DB.First(&staff).Error
	if err != nil {
		return nil, err
	}

	DB.Delete(staff)

	return staff, nil
}

func GetStaff(query ...func(*gorm.DB) *gorm.DB) ([]Staff, error) {
	staffs := []Staff{}

	err := DB.Scopes(query...).Find(&staffs).Error
	if err != nil {
		return nil, err
	}

	return staffs, nil
}

func GetStaffByID(id string) (*Staff, error) {
	staff := &Staff{}

	err := DB.Where(`"MaNV" = ?`, id).First(staff).Error
	if err != nil {
		return nil, err
	}

	return staff, nil
}

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}
