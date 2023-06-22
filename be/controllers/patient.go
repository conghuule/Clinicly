package controllers

import (
	"clinic-management/models"
	"clinic-management/types"
	"clinic-management/utils"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PatientRequest struct {
	FullName     string       `json:"full_name" binding:"required"`
	Gender       types.Gender `json:"gender" binding:"required,enum"`
	BirthDate    string       `json:"birth_date" binding:"required" example:"2002-02-28"`
	IdentityCard string       `json:"identity_card" binding:"required"`
	Address      string       `json:"address" binding:"required"`
	PhoneNumber  string       `json:"phone_number" binding:"required"`
}

type UpdatePatientRequest struct {
	FullName     string       `json:"full_name"`
	Gender       types.Gender `json:"gender" binding:"enum"`
	BirthDate    string       `json:"birth_date" example:"2002-02-28"`
	IdentityCard string       `json:"identity_card"`
	Address      string       `json:"address"`
	PhoneNumber  string       `json:"phone_number"`
}

type PatientResponse struct {
	Response
	Data models.Patient `json:"data"`
}

type PatientListResponse struct {
	Response
	Data []models.Patient `json:"data"`
}

type PatientQuery struct {
	PaginateQuery
	Name    string `form:"name"`
	OrderBy string `form:"order_by,default=NgayTao"`
	Desc    bool   `form:"desc,default=false"`
}

// @Summary Get patient
// @Description Get patient
// @Tags patient
// @Produce json
// @Param name query string false "Patient name"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} PatientListResponse "Patient response"
// @Router /patient [get]
func GetPatient(c *gin.Context) {
	var patientQuery PatientQuery
	if err := c.ShouldBind(&patientQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	patients, err := models.GetPatient(query.Paginate(c),
		query.OrderBy(patientQuery.OrderBy, patientQuery.Desc),
		query.StringSearch("HoTen", patientQuery.Name))
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

// @Summary Create patient
// @Description Create patient
// @Tags patient
// @Accept json
// @Produce json
// @Param data body PatientRequest true "Patient data"
// @Success 200 {object} PatientResponse "Patient response"
// @Router /patient [post]
func CreatePatient(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var input PatientRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	date, err := utils.ParseDate(input.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	patient := models.Patient{
		FullName:     input.FullName,
		BirthDate:    date,
		Gender:       input.Gender.Value(),
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		UpdatedBy:    &uid,
	}

	_, err = patient.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, PatientResponse{
		Response: SuccessfulResponse,
		Data:     patient,
	})
}

// @Summary Update patient
// @Description Update patient
// @Tags patient
// @Accept json
// @Produce json
// @Param id path int true "Patient id"
// @Param data body UpdatePatientRequest true "Patient data"
// @Success 200 {object} PatientResponse "Patient response"
// @Router /patient/{id} [put]
func UpdatePatient(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	id := c.Param("id")

	var input UpdatePatientRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	patient, err := models.GetPatientByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	date, err := utils.ParseDate(input.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	updatedPatient := models.Patient{
		FullName:     input.FullName,
		BirthDate:    date,
		Gender:       input.Gender.Value(),
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		UpdatedBy:    &uid,
	}

	patient, err = patient.Update(updatedPatient)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, PatientResponse{
		Response: SuccessfulResponse,
		Data:     *patient,
	})
}

// @Summary Delete patient
// @Description Delete patient
// @Tags patient
// @Produce json
// @Param id path int true "Patient id"
// @Success 200 {object} PatientResponse "Patient response"
// @Router /patient/{id} [delete]
func DeletePatient(c *gin.Context) {
	id := c.Param("id")

	patient, err := models.GetPatientByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	patient, err = patient.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, PatientResponse{
		Response: SuccessfulResponse,
		Data:     *patient,
	})
}

// @Summary Get patient enums
// @Description Get patient enums
// @Tags patient
// @Produce json
// @Router /patient/enums [get]
func GetPatientEnums(c *gin.Context) {
	response := SuccessfulResponse

	response.Data = types.PatientEnums

	c.JSON(http.StatusOK, response)
}
