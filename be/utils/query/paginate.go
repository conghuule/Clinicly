package query

import (
	"clinic-management/models"
	"math"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Paginate(c *gin.Context, model any) (function func(db *gorm.DB) *gorm.DB, page int, pageSize int, totalPage int) {
	var count int64
	models.DB.Find(&model).Count(&count)

	pageSize, _ = strconv.Atoi(c.Query("page_size"))
	switch {
	case pageSize > 100:
		pageSize = 100
	case pageSize <= 0:
		pageSize = 10
	}

	totalPage = int(math.Ceil(float64(count) / float64(pageSize)))
	page, _ = strconv.Atoi(c.Query("page"))
	if page <= 1 {
		page = 1
	} else if page >= int(totalPage) {
		page = int(totalPage)
	}

	offset := (page - 1) * pageSize

	return func(db *gorm.DB) *gorm.DB {
		return db.Offset(offset).Limit(pageSize)
	}, page, pageSize, totalPage
}
