package types

type Role int

const (
	Receptionist Role = iota + 1
	Doctor
	Pharmacist
	Admin
)

func (s Role) IsValid() bool {
	switch s {
	case Receptionist, Doctor, Pharmacist, Admin:
		return true
	}

	return false
}

func (s Role) Value() string {
	switch s {
	case Receptionist:
		return "Tiếp tân"
	case Doctor:
		return "Bác sĩ"
	case Pharmacist:
		return "Dược sĩ"
	case Admin:
		return "Quản lý"
	default:
		return ""
	}
}

type StaffStatus int

const (
	Working StaffStatus = iota + 1
	Quit
)

func (s StaffStatus) IsValid() bool {
	switch s {
	case Working, Quit:
		return true
	}

	return false
}

func (s StaffStatus) Value() string {
	switch s {
	case Working:
		return "Đang làm"
	case Quit:
		return "Đã nghỉ"
	default:
		return ""
	}
}

var StaffEnums = map[string]any{
	"role": []map[string]any{
		{
			"id":           Receptionist,
			"display_name": Receptionist.Value(),
		},
		{
			"id":           Doctor,
			"display_name": Doctor.Value(),
		},
		{
			"id":           Pharmacist,
			"display_name": Pharmacist.Value(),
		},
		{
			"id":           Admin,
			"display_name": Admin.Value(),
		},
	},
	"status": []map[string]any{
		{
			"id":           Working,
			"display_name": Working.Value(),
		},
		{
			"id":           Quit,
			"display_name": Quit.Value(),
		},
	},
	"gender": []map[string]any{
		{
			"id":           Male,
			"display_name": Male.Value(),
		},
		{
			"id":           Female,
			"display_name": Female.Value(),
		},
		{
			"id":           Other,
			"display_name": Other.Value(),
		},
	},
}
