package query

import (
	"fmt"

	"gorm.io/gorm"
)

func DebounceSearch(field, value string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where(fmt.Sprintf(`"%s" LIKE ?`, field), fmt.Sprintf("%%%s%%", value))
	}
}
