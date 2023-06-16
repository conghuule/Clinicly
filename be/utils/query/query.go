package query

import (
	"clinic-management/utils"
	"fmt"
	"time"

	"gorm.io/gorm"
)

func StringSearch(field, value string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where(fmt.Sprintf(`"%s" LIKE ?`, field), fmt.Sprintf("%%%s%%", value))
	}
}

func QueryByField(field, value string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if value == "" {
			return db
		}

		return db.Where(fmt.Sprintf(`"%s" = ?`, field), value)
	}
}

func QueryByDate(field string, date string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		startDate, _ := utils.ParseDate(date)
		endDate := startDate.Add(time.Hour * 24 * time.Duration(1))

		return db.Where(fmt.Sprintf(`"%s" BETWEEN ? AND ?`, field), startDate, endDate)
	}
}
