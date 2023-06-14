package query

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

func StringSearch(field, value string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where(fmt.Sprintf(`"%s" LIKE ?`, field), fmt.Sprintf("%%%s%%", value))
	}
}

func QueryByDate(field string, date time.Time) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		startDate := date
		endDate := startDate.Add(time.Hour * 24 * time.Duration(1))

		return db.Where(fmt.Sprintf(`"%s" BETWEEN ? AND ?`, field), startDate, endDate)
	}
}
