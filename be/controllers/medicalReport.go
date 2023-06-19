package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type PrescriptionRequest struct {
	MedicineID  string `json:"medicine" binding:"required"`
	Quantity    uint   `json:"quantity" binding:"required"`
	Instruction string `json:"instruction" binding:"required"`
}

type MedicalReportRequest struct {
	PatientID    uint                  `json:"patient" binding:"required"`
	DoctorID     uint                  `json:"doctor" binding:"required"`
	Diagnose     string                `json:"diagnose"`
	Prescription []PrescriptionRequest `json:"prescription"`
	Date         *time.Time            `json:"date"`
}

type UpdateMedicalReportRequest struct {
	PatientID    uint                  `json:"patient"`
	DoctorID     uint                  `json:"doctor"`
	Diagnose     string                `json:"diagnose"`
	Prescription []PrescriptionRequest `json:"prescription"`
	Date         *time.Time            `json:"date"`
}

type MedicalReportResponse struct {
	Response
	Data models.MedicalReport `json:"data"`
}

type MedicalReportListResponse struct {
	Response
	Data []models.MedicalReport `json:"data"`
}

type MedicalReportQuery struct {
	PaginateQuery
	Patient string `form:"patient"`
	Date    string `form:"date"`
	OrderBy string `form:"order_by,default=NgayTao"`
	Desc    bool   `form:"desc,default=false"`
}

// @Summary Get medical report
// @Description Get medical report
// @Tags medical report
// @Produce json
// @Param patient query string false "Patient"
// @Param date query string false "Date"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} MedicalReportListResponse "Medical report response"
// @Router /medical-report [get]
func GetMedicalReport(c *gin.Context) {
	var reportQuery MedicalReportQuery
	if err := c.ShouldBind(&reportQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	reports, err := models.GetMedicalReport(query.Paginate(c),
		query.QueryByField("MaBN", reportQuery.Patient),
		query.QueryByDate("NgayKham", reportQuery.Date),
		query.OrderBy(reportQuery.OrderBy, reportQuery.Desc))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicalReportListResponse{
		Response: SuccessfulResponse,
		Data:     reports,
	})
}

// @Summary Get medical report by id
// @Description Get medical report by id
// @Tags medical report
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} MedicalReportResponse "Medical report response"
// @Router /medical-report/{id} [get]
func GetMedicalReportByID(c *gin.Context) {
	report, err := models.GetMedicalReportByID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicalReportResponse{
		Response: SuccessfulResponse,
		Data:     *report,
	})
}

// @Summary Create medical report
// @Description Create medical report
// @Tags medical report
// @Accept json
// @Produce json
// @Param data body MedicalReportRequest true "Medical report data"
// @Success 200 {object} MedicalReportResponse "Medical report response"
// @Router /medical-report [post]
func CreateMedicalReport(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var input MedicalReportRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var prescription []models.Prescription
	for _, value := range input.Prescription {
		prescription = append(prescription, models.Prescription{
			MedicineID:  value.MedicineID,
			Quantity:    value.Quantity,
			Instruction: value.Instruction,
			UpdatedBy:   &uid,
		})
	}

	now := time.Now()
	report := models.MedicalReport{
		PatientID:    input.PatientID,
		DoctorID:     input.DoctorID,
		Diagnose:     input.Diagnose,
		Prescription: prescription,
		Date:         &now,
		UpdatedBy:    &uid,
	}

	_, err = report.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicalReportResponse{
		Response: SuccessfulResponse,
		Data:     report,
	})
}

// @Summary Update medical report
// @Description Update medical report
// @Tags medical report
// @Accept json
// @Produce json
// @Param id path int true "Medical report id"
// @Param data body UpdateMedicalReportRequest true "Medical report data"
// @Success 200 {object} MedicalReportResponse "Medical report response"
// @Router /medical-report/{id} [put]
func UpdateMedicalReport(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	id := c.Param("id")

	var input UpdateMedicalReportRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	report, err := models.GetMedicalReportByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var prescription []models.Prescription
	for _, value := range input.Prescription {
		prescription = append(prescription, models.Prescription{
			MedicineID:  value.MedicineID,
			Quantity:    value.Quantity,
			Instruction: value.Instruction,
		})
	}

	updatedTicket := models.MedicalReport{
		PatientID:    input.PatientID,
		DoctorID:     input.DoctorID,
		Diagnose:     input.Diagnose,
		Prescription: prescription,
		Date:         input.Date,
		UpdatedBy:    &uid,
	}

	report, err = report.Update(updatedTicket)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicalReportResponse{
		Response: SuccessfulResponse,
		Data:     *report,
	})
}

// @Summary Delete medical report
// @Description Delete medical report
// @Tags medical report
// @Produce json
// @Param id path int true "Medical report id"
// @Success 200 {object} MedicalReportResponse "Medical report response"
// @Router /medical-report/{id} [delete]
func DeleteMedicalReport(c *gin.Context) {
	id := c.Param("id")

	report, err := models.GetMedicalReportByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	_, err = report.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicalReportResponse{
		Response: SuccessfulResponse,
		Data:     *report,
	})
}
