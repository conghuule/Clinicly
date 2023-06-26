package controllers

import (
	"clinic-management/models"
	"clinic-management/utils"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type MedicineReportRequest struct {
	MedicineID string `json:"medicine_id" binding:"required"`
	Quantity   uint   `json:"quantity" binding:"required"`
	Date       string `json:"date" example:"2002-02-28"`
}

type UpdateMedicineReportRequest struct {
	MedicineID string `json:"medicine_id"`
	Quantity   uint   `json:"quantity"`
	Date       string `json:"date" example:"2002-02-28"`
}

type MedicineReportResponse struct {
	Response
	Data models.MedicineReport `json:"data"`
}

type MedicineReportListResponse struct {
	Response
	Data     []models.MedicineReport `json:"data"`
	PageInfo any                     `json:"page_info"`
}

type MedicineReportQuery struct {
	PaginateQuery
	Date    string `form:"date"`
	OrderBy string `form:"order_by,default=NgayTao"`
	Desc    bool   `form:"desc,default=false"`
}

// @Summary Get medicine report
// @Description Get medicine report
// @Tags medicine report
// @Produce json
// @Param date query string false "Date"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} MedicineReportListResponse "Medicine report response"
// @Router /medicine-report [get]
func GetMedicineReport(c *gin.Context) {
	var reportQuery MedicineReportQuery
	if err := c.ShouldBind(&reportQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	paginate, page, pageSize, totalPage := query.Paginate(c, []models.MedicineReport{})
	reports, err := models.GetMedicineReport(paginate,
		query.QueryByDate("NgayNhap", reportQuery.Date),
		query.OrderBy(reportQuery.OrderBy, reportQuery.Desc))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineReportListResponse{
		Response: SuccessfulResponse,
		Data:     reports,
		PageInfo: gin.H{
			"page_size":  pageSize,
			"page":       page,
			"total_page": totalPage,
		},
	})
}

// @Summary Get medicine report by id
// @Description Get medicine report by id
// @Tags medicine report
// @Produce json
// @Param id path string true "Medicine report id"
// @Success 200 {object} MedicineReportResponse "Medicine report response"
// @Router /medicine-report/{id} [get]
func GetMedicineReportByID(c *gin.Context) {
	id := c.Param("id")

	report, err := models.GetMedicineReportByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineReportResponse{
		Response: SuccessfulResponse,
		Data:     *report,
	})
}

// @Summary Create medicine report
// @Description Create medicine report
// @Tags medicine report
// @Accept json
// @Produce json
// @Param data body MedicineReportRequest true "Medicine report data"
// @Success 200 {object} MedicineReportResponse "Medicine report response"
// @Router /medicine-report [post]
func CreateMedicineReport(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var input MedicineReportRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	now := time.Now()
	report := models.MedicineReport{
		MedicineID: input.MedicineID,
		Quantity:   input.Quantity,
		Date:       &now,
		UpdatedBy:  &uid,
	}

	_, err = report.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineReportResponse{
		Response: SuccessfulResponse,
		Data:     report,
	})
}

// @Summary Update medicine report
// @Description Update medicine report
// @Tags medicine report
// @Accept json
// @Produce json
// @Param id path string true "Medicine report id"
// @Param data body UpdateMedicineReportRequest true "Medicine report data"
// @Success 200 {object} MedicineReportResponse "Medicine report response"
// @Router /medicine-report/{id} [put]
func UpdateMedicineReport(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	id := c.Param("id")

	var input UpdateMedicineReportRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	report, err := models.GetMedicineReportByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	date, err := utils.ParseDate(input.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	updatedReport := models.MedicineReport{
		MedicineID: input.MedicineID,
		Quantity:   input.Quantity,
		Date:       date,
		UpdatedBy:  &uid,
	}

	report, err = report.Update(updatedReport)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineReportResponse{
		Response: SuccessfulResponse,
		Data:     *report,
	})
}

// @Summary Delete medicine report
// @Description Delete medicine report
// @Tags medicine report
// @Produce json
// @Param id path string true "Medicine report id"
// @Success 200 {object} MedicineReportResponse "Medicine report response"
// @Router /medicine-report/{id} [delete]
func DeleteMedicineReport(c *gin.Context) {
	id := c.Param("id")

	report, err := models.GetMedicineReportByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	_, err = report.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineReportResponse{
		Response: SuccessfulResponse,
		Data:     *report,
	})
}
