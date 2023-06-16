package types

type TicketStatus int

const (
	Waiting TicketStatus = iota + 1
	Processing
	Done
)

func (t TicketStatus) IsValid() bool {
	switch t {
	case Waiting, Processing, Done:
		return true
	}

	return false
}

func (t TicketStatus) Value() string {
	switch t {
	case Waiting:
		return "Đợi khám"
	case Processing:
		return "Đang khám"
	case Done:
		return "Đã khám"
	default:
		return ""
	}
}

var TicketEnums = map[string]any{
	"status": []map[string]any{
		{
			"id":           Waiting,
			"display_name": Waiting.Value(),
		},
		{
			"id":           Processing,
			"display_name": Processing.Value(),
		},
	},
}
