package utils

import (
	"fmt"
	"log"
	"time"
)

// Date format "yyyy-mm-dd"
func ParseDate(date string) (*time.Time, error) {
	var res time.Time

	loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
	if err != nil {
		log.Fatalf(err.Error())
	}
	res, err = time.ParseInLocation("2006-01-02", date, loc)
	if err != nil {
		return nil, err
	}

	fmt.Println(res)

	return &res, nil
}

func GetCurrentDateString() string {
	return time.Now().Format("2006-01-02")
}
