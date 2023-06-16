package utils

import "time"

//Date format "yyyy-dd-mm"
func ParseDate(date string) (*time.Time, error) {
	var res time.Time

	res, err := time.Parse("2006-01-02", date)
	if err != nil {
		return nil, err
	}

	return &res, nil
}

func GetCurrentDateString() string {
	return time.Now().Format("2006-01-02")
}
