package controllers

import (
	"clinic-management/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type PatientRequest struct {
	FullName     string    `json:"full_name" binding:"required"`
	Gender       string    `json:"gender" binding:"required"`
	BirthDate    time.Time `json:"birth_date" binding:"required"`
	IdentityCard string    `json:"identity_card" binding:"required"`
	Address      string    `json:"address" binding:"required"`
	PhoneNumber  string    `json:"phone_number" binding:"required"`
	UpdatedBy    *uint     `json:"updated_by"`
}

type PatientResponse struct {
	Response
	Data models.Patient `json:"data"`
}

type PatientListResponse struct {
	Response
	Data []models.Patient `json:"data"`
}

// @Summary Create patient
// @Description Create patient
// @Tags patient
// @Accept json
// @Produce json
// @Param data body PatientRequest true "Patient data"
// @Success 200 {object} PatientResponse "Patient response"
// @Router /patient/create [post]
func CreatePatient(c *gin.Context) {
	var input PatientRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	patient := models.Patient{
		FullName:     input.FullName,
		BirthDate:    input.BirthDate,
		Gender:       input.Gender,
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		UpdatedBy:    input.UpdatedBy,
	}

	_, err := patient.CreatePatient()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, PatientResponse{
		Response: SuccessfulResponse,
		Data:     patient,
	})
}

// @Summary Get patient
// @Description Get patient
// @Tags patient
// @Produce json
// @Success 200 {object} PatientListResponse "Patient response"
// @Router /patient [get]
func GetPatient(c *gin.Context) {
	patients, err := models.GetPatient()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, PatientListResponse{
		Response: SuccessfulResponse,
		Data:     patients,
	})
}

// @Summary Get patient by id
// @Description Get patient by id
// @Tags patient
// @Produce json
// @Param id path int true "Patient id"
// @Success 200 {object} PatientResponse "Patient response"
// @Router /patient/{id} [get]
func GetPatientByID(c *gin.Context) {
	id := c.Param("id")

	patient, err := models.GetPatientByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, PatientResponse{
		Response: SuccessfulResponse,
		Data:     *patient,
	})
}
