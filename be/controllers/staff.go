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

type StaffRequest struct {
	FullName     string            `json:"full_name" binding:"required"`
	BirthDate    string            `json:"birth_date" binding:"required" example:"2002-02-28"`
	Gender       types.Gender      `json:"gender" binding:"required,enum"`
	Address      string            `json:"address" binding:"required"`
	IdentityCard string            `json:"identity_card" binding:"required"`
	PhoneNumber  string            `json:"phone_number" binding:"required"`
	Email        string            `json:"email" binding:"required"`
	Role         types.Role        `json:"role" binding:"required,enum"`
	Salary       uint              `json:"salary"`
	Status       types.StaffStatus `json:"status" binding:"enum"`
	Password     string            `json:"password" binding:"required"`
}

type UpdateStaffRequest struct {
	FullName     string            `json:"full_name"`
	BirthDate    string            `json:"birth_date" example:"2002-02-28"`
	Gender       types.Gender      `json:"gender" binding:"enum"`
	Address      string            `json:"address"`
	IdentityCard string            `json:"identity_card"`
	PhoneNumber  string            `json:"phone_number"`
	Email        string            `json:"email"`
	Role         types.Role        `json:"role" binding:"enum"`
	Salary       uint              `json:"salary"`
	Status       types.StaffStatus `json:"status" binding:"enum"`
	Password     string            `json:"password"`
}

type StaffResponse struct {
	Response
	Data models.Staff `json:"data"`
}

type StaffListResponse struct {
	Response
	Data []models.Staff `json:"data"`
}

type StaffQuery struct {
	PaginateQuery
	Name    string `form:"name"`
	OrderBy string `form:"order_by,default=NgayTao"`
	Desc    bool   `form:"desc,default=false"`
}

// @Summary Get staff
// @Description Get staff
// @Tags staff
// @Produce json
// @Param name query string false "Staff name"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} StaffListResponse "Staff response"
// @Router /staff [get]
func GetStaff(c *gin.Context) {
	var staffQuery StaffQuery
	if err := c.ShouldBind(&staffQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	staffs, err := models.GetStaff(query.Paginate(c),
		query.OrderBy(staffQuery.OrderBy, staffQuery.Desc),
		query.StringSearch("HoTen", staffQuery.Name))
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

// @Summary Create staff
// @Description Create staff
// @Tags staff
// @Accept json
// @Produce json
// @Param data body StaffRequest true "Staff data"
// @Success 200 {object} StaffResponse "Staff response"
// @Router /staff [post]
func CreateStaff(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var input StaffRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	input.Status = types.Working

	date, err := utils.ParseDate(input.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	staff := models.Staff{
		FullName:     input.FullName,
		BirthDate:    date,
		Gender:       input.Gender.Value(),
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		Email:        input.Email,
		Role:         input.Role.Value(),
		Salary:       input.Salary,
		Status:       input.Status.Value(),
		Password:     input.Password,
		UpdatedBy:    &uid,
	}

	_, err = staff.Create()
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
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

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

	date, err := utils.ParseDate(input.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}
	updatedStaff := models.Staff{
		FullName:     input.FullName,
		BirthDate:    date,
		Gender:       input.Gender.Value(),
		Address:      input.Address,
		IdentityCard: input.IdentityCard,
		PhoneNumber:  input.PhoneNumber,
		Email:        input.Email,
		Role:         input.Role.Value(),
		Salary:       input.Salary,
		Status:       input.Status.Value(),
		Password:     input.Password,
		UpdatedBy:    &uid,
	}

	staff, err = staff.Update(updatedStaff)
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

	_, err = staff.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, StaffResponse{
		Response: SuccessfulResponse,
		Data:     *staff,
	})
}

// @Summary Get staff enums
// @Description Get staff enums
// @Tags staff
// @Produce json
// @Router /staff/enums [get]
func GetStaffEnums(c *gin.Context) {
	response := SuccessfulResponse

	response.Data = types.StaffEnums

	c.JSON(http.StatusOK, response)
}
