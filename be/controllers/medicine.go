package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MedicineResponse struct {
	Response
	Data models.Medicine `json:"data"`
}

type MedicineListResponse struct {
	Response
	Data []models.Medicine `json:"data"`
}

// @Summary Get medicine
// @Description Get medicine
// @Tags medicine
// @Produce json
// @Param id query string false "Medicine id"
// @Param name query string false "Medicine name"
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} MedicineListResponse "Medicine response"
// @Router /medicine [get]
func GetMedicine(c *gin.Context) {
	medicines, err := models.GetMedicine(query.Paginate(c),
		query.OrderBy("NgayTao", false),
		query.StringSearch("MaThuoc", c.Query("id")),
		query.StringSearch("TenThuoc", c.Query("name")))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineListResponse{
		Response: SuccessfulResponse,
		Data:     medicines,
	})
}
