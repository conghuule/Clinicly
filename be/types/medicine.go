package types

type MedicineUnit int

const (
	Pill MedicineUnit = iota + 1
	Bottle
)

func (m MedicineUnit) IsValid() bool {
	switch m {
	case Pill, Bottle:
		return true
	}

	return false
}

func (m MedicineUnit) Value() string {
	switch m {
	case Pill:
		return "Viên"
	case Bottle:
		return "Chai"
	default:
		return ""
	}
}

var MedicineEnums = map[string]any{
	"unit": []map[string]any{
		{
			"id":           Pill,
			"display_name": Pill.Value(),
		},
		{
			"id":           Bottle,
			"display_name": Bottle.Value(),
		},
	},
}
