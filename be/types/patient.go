package types

var PatientEnums = map[string]any{
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
