package types

type Enum interface {
	IsValid() bool
}

type Gender int

const (
	Male Gender = iota + 1
	Female
	Other
)

func (g Gender) IsValid() bool {
	switch g {
	case Male, Female, Other:
		return true
	}

	return false
}

func (g Gender) Value() string {
	switch g {
	case Male:
		return "Nam"
	case Female:
		return "Nữ"
	case Other:
		return "Khác"
	default:
		return ""
	}
}
