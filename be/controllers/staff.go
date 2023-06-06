package controllers

import (
	"clinic-management/models"
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
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
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
	}

	_, err := staff.CreateStaff()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     staff,
	})
}

// @Summary Get staff
// @Description Get staff
// @Tags staff
// @Produce json
// @Success 200 {object} StaffListResponse "Staff response"
// @Router /staff [get]
func GetStaff(c *gin.Context) {
	staffs, err := models.GetStaff()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
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
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     *staff,
	})
}
