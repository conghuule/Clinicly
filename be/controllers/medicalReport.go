package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type PrescriptionRequest struct {
	MedicineID  string `json:"medicine_id" binding:"required"`
	Quantity    uint   `json:"quantity" binding:"required"`
	Instruction string `json:"instruction" binding:"required"`
}

type MedicalReportRequest struct {
	PatientID    uint                  `json:"patient_id" binding:"required"`
	DoctorID     uint                  `json:"doctor_id" binding:"required"`
	Diagnose     string                `json:"diagnose"`
	Prescription []PrescriptionRequest `json:"prescription"`
	Date         *time.Time            `json:"date"`
	UpdatedBy    *uint                 `json:"updated_by"`
}

type UpdateMedicalReportRequest struct {
	PatientID    uint                  `json:"patient_id"`
	DoctorID     uint                  `json:"doctor_id"`
	Diagnose     string                `json:"diagnose"`
	Prescription []PrescriptionRequest `json:"prescription"`
	Date         *time.Time            `json:"date"`
	UpdatedBy    *uint                 `json:"updated_by"`
}

type MedicalReportResponse struct {
	Response
	Data models.MedicalReport `json:"data"`
}

type MedicalReportListResponse struct {
	Response
	Data []models.MedicalReport `json:"data"`
}

// @Summary Get medical report
// @Description Get medical report
// @Tags medical report
// @Produce json
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} MedicalReportListResponse "Medical report response"
// @Router /medical-report [get]
func GetMedicalReport(c *gin.Context) {
	reports, err := models.GetMedicalReport(query.Paginate(c),
		query.OrderBy("NgayTao", false))
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
		})
	}

	now := time.Now()
	report := models.MedicalReport{
		PatientID:    input.PatientID,
		DoctorID:     input.DoctorID,
		Diagnose:     input.Diagnose,
		Prescription: prescription,
		Date:         &now,
		UpdatedBy:    input.UpdatedBy,
	}

	_, err := report.Create()
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
		UpdatedBy:    input.UpdatedBy,
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
