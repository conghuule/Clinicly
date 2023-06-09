package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type StaffRequest struct {
	FullName     string    `json:"full_name" binding:"required"`
	BirthDate    time.Time `json:"birth_date" binding:"required"`
	Gender       string    `json:"gender" binding:"required"`
	Address      string    `json:"address" binding:"required"`
	IdentityCard string    `json:"identity_card" binding:"required"`
	PhoneNumber  string    `json:"phone_number" binding:"required"`
	Email        string    `json:"email" binding:"required"`
	StaffType    string    `json:"staff_type" binding:"required"`
	Salary       uint      `json:"salary"`
	Status       string    `json:"status"`
	Password     string    `json:"password" binding:"required"`
	UpdatedBy    *uint     `json:"updated_by"`
}

type UpdateStaffRequest struct {
	FullName     string    `json:"full_name"`
	BirthDate    time.Time `json:"birth_date"`
	Gender       string    `json:"gender"`
	Address      string    `json:"address"`
	IdentityCard string    `json:"identity_card"`
	PhoneNumber  string    `json:"phone_number"`
	Email        string    `json:"email"`
	StaffType    string    `json:"staff_type"`
	Salary       uint      `json:"salary"`
	Status       string    `json:"status"`
	Password     string    `json:"password"`
	UpdatedBy    *uint     `json:"updated_by"`
}

type StaffResponse struct {
	Response
	Data models.Staff `json:"data"`
}

type StaffListResponse struct {
	Response
	Data []models.Staff `json:"data"`
}

// @Summary Create staff
// @Description Create staff
// @Tags staff
// @Accept json
// @Produce json
// @Param data body StaffRequest true "Staff data"
// @Success 200 {object} StaffResponse "Staff response"
// @Router /staff/create [post]
func CreateStaff(c *gin.Context) {
	var input StaffRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	staff := models.Staff{
		FullName:     input.FullName,
		BirthDate:    input.BirthDate,
		Gender:       input.Gender,
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		Email:        input.Email,
		StaffType:    input.StaffType,
		Salary:       input.Salary,
		Status:       input.Status,
		Password:     input.Password,
		UpdatedBy:    input.UpdatedBy,
	}

	_, err := staff.CreateStaff()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     staff,
	})
}

// @Summary Update staff
// @Description Update staff
// @Tags staff
// @Accept json
// @Produce json
// @Param id path int true "Staff id"
// @Param data body UpdateStaffRequest true "Staff data"
// @Success 200 {object} StaffResponse "Staff response"
// @Router /staff/{id} [put]
func UpdateStaff(c *gin.Context) {
	id := c.Param("id")

	var input UpdateStaffRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	staff, err := models.GetStaffByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	updatedStaff := models.Staff{
		FullName:     input.FullName,
		BirthDate:    input.BirthDate,
		Gender:       input.Gender,
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		Email:        input.Email,
		StaffType:    input.StaffType,
		Salary:       input.Salary,
		Status:       input.Status,
		Password:     input.Password,
		UpdatedBy:    input.UpdatedBy,
	}

	staff, err = staff.UpdateStaff(updatedStaff)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     *staff,
	})
}

// @Summary Delete staff
// @Description Delete staff
// @Tags staff
// @Produce json
// @Param id path int true "Staff id"
// @Success 200 {object} StaffResponse "Staff response"
// @Router /staff/{id} [delete]
func DeleteStaff(c *gin.Context) {
	id := c.Param("id")

	staff, err := models.GetStaffByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	staff, err = staff.DeleteStaff()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     *staff,
	})
}

// @Summary Get staff
// @Description Get staff
// @Tags staff
// @Produce json
// @Param name query string false "Staff name"
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} StaffListResponse "Staff response"
// @Router /staff [get]
func GetStaff(c *gin.Context) {
	staffs, err := models.GetStaff(query.Paginate(c),
		query.StringSearch("HoTen", c.Query("name")))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, StaffListResponse{
		Response: SuccessfulResponse,
		Data:     staffs,
	})
}

// @Summary Get staff by id
// @Description Get staff by id
// @Tags staff
// @Produce json
// @Param id path int true "Staff id"
// @Success 200 {object} StaffResponse "Staff response"
// @Router /staff/{id} [get]
func GetStaffByID(c *gin.Context) {
	id := c.Param("id")

	staff, err := models.GetStaffByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     *staff,
	})
}
