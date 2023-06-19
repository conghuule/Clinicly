package models

const TableNameUser = "NhanVien"

type User struct {
	ID       uint   `gorm:"column:MaNV" json:"id"`
	Email    string `gorm:"column:Email" json:"email"`
	Role     string `gorm:"column:LoaiNV" json:"role"`
	Password string `gorm:"column:Password" json:"-"`
}

func (User) TableName() string {
	return TableNameStaff
}

func GetUserByEmail(email string) (*User, error) {
	user := &User{}

	err := DB.Where(&User{Email: email}).First(&user).Error

	if err != nil {
		return nil, err
	}

	return user, nil
}

func initAdminAccount() {
	var adminAccount = Staff{
		Email:        "admin",
		Password:     "admin",
		IdentityCard: "000000000000",
		PhoneNumber:  "0000000000",
	}

	if _, err := GetUserByEmail(adminAccount.Email); err != nil {
		adminAccount.Create()
		return
	}
}
