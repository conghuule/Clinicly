package query

import (
	"fmt"

	"gorm.io/gorm"
)

func OrderBy(field string, desc bool) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		var sortIn string
		if desc {
			sortIn = "desc"
		} else {
			sortIn = "asc"
		}

		return db.Order(fmt.Sprintf(`"%s" %s`, field, sortIn))
	}
}
