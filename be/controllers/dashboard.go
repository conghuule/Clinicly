package controllers

import (
	"clinic-management/models"
	"clinic-management/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type DashboardReport struct {
	NewPatient    int   `json:"new_patient"`
	NewRevenue    int   `json:"new_revenue"`
	NewMedicine   int   `json:"new_medicine"`
	NewTicket     int   `json:"new_ticket"`
	TotalPatient  int   `json:"total_patient"`
	TotalTicket   int   `json:"total_ticket"`
	TotalRevenue  int   `json:"total_revenue"`
	TotalMedicine int   `json:"total_medicine"`
	PatientData   []int `json:"patient_data"`
	RevenueData   []int `json:"revenue_data"`
	MedicineData  []int `json:"medicine_data"`
	TicketData    []int `json:"ticket_data"`
}

type DashboardReportResponse struct {
	Response
	Data DashboardReport `json:"data"`
}

type DashboardReportQuery struct {
	StartDate string `form:"start_date" binding:"required"`
	EndDate   string `form:"end_date" binding:"required"`
}

// @Summary Get dashboard
// @Description Get dashboard
// @Tags dashboard
// @Produce json
// @Param start_date query string true "Start date" example(2002-02-20)
// @Param end_date query string true "End date" example(2002-02-28)
// @Success 200 {object} DashboardReportResponse "Dashboard response"
// @Router /dashboard [get]
func GetDashboardReport(c *gin.Context) {
	var reportQuery DashboardReportQuery
	if err := c.ShouldBind(&reportQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	if reportQuery.StartDate == "" {
		reportQuery.StartDate = utils.GetCurrentDateString()
	}
	if reportQuery.EndDate == "" {
		date, _ := utils.ParseDate(utils.GetCurrentDateString())
		reportQuery.EndDate = date.Add(time.Hour * 24 * time.Duration(1)).Format("2006-01-02")
	}

	startDate, err := utils.ParseDate(reportQuery.StartDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	endDate, err := utils.ParseDate(reportQuery.EndDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	patientData, newPatient, totalPatient, err := models.GetPatientMetric(*startDate, *endDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	revenueData, newRevenue, totalRevenue, err := models.GetRevenueMetric(*startDate, *endDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	medicineData, newMedicine, totalMedicine, err := models.GetMedicineMetric(*startDate, *endDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	ticketData, newTicket, totalTicket, err := models.GetTicketMetric(*startDate, *endDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	dashboardReport := DashboardReport{
		NewPatient:    *newPatient,
		NewRevenue:    *newRevenue,
		NewMedicine:   *newMedicine,
		NewTicket:     *newTicket,
		TotalPatient:  *totalPatient,
		TotalRevenue:  *totalRevenue,
		TotalMedicine: *totalMedicine,
		TotalTicket:   *totalTicket,
		PatientData:   patientData,
		RevenueData:   revenueData,
		MedicineData:  medicineData,
		TicketData:    ticketData,
	}

	c.JSON(http.StatusOK, DashboardReportResponse{
		Response: SuccessfulResponse,
		Data:     dashboardReport,
	})

	// medicines, err := models.GetMedicine()
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
	// 	return
	// }

	// invocies, err := models.GetInvoice()
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
	// 	return
	// }

	// tickets, err := models.GetTicket()
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
	// 	return
	// }

	// totalPatient := len(patients)

}
