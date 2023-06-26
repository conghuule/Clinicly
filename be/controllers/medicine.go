package controllers

import (
	"clinic-management/models"
	"clinic-management/types"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MedicineRequest struct {
	ID       string             `json:"id" binding:"required"`
	Name     string             `json:"name" binding:"required"`
	Quantity uint               `json:"quantity" binding:"required"`
	Price    uint               `json:"price" binding:"required"`
	Info     string             `json:"info"`
	Unit     types.MedicineUnit `json:"unit" binding:"required,enum"`
}

type UpdateMedicineRequest struct {
	ID       string             `json:"id"`
	Name     string             `json:"name"`
	Quantity uint               `json:"quantity"`
	Price    uint               `json:"price"`
	Info     string             `json:"info"`
	Unit     types.MedicineUnit `json:"unit" binding:"enum"`
}

type MedicineResponse struct {
	Response
	Data models.Medicine `json:"data"`
}

type MedicineListResponse struct {
	Response
	Data     []models.Medicine `json:"data"`
	PageInfo any               `json:"page_info"`
}

type MedicineQuery struct {
	PaginateQuery
	ID      string `form:"id"`
	Name    string `form:"name"`
	OrderBy string `form:"order_by,default=NgayTao"`
	Desc    bool   `form:"desc,default=false"`
}

// @Summary Get medicine
// @Description Get medicine
// @Tags medicine
// @Produce json
// @Param id query string false "Medicine id"
// @Param name query string false "Medicine name"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} MedicineListResponse "Medicine response"
// @Router /medicine [get]
func GetMedicine(c *gin.Context) {
	var medicineQuery MedicineQuery
	if err := c.ShouldBind(&medicineQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	paginate, page, pageSize, totalPage := query.Paginate(c, []models.Medicine{})
	medicines, err := models.GetMedicine(paginate,
		query.OrderBy(medicineQuery.OrderBy, medicineQuery.Desc),
		query.StringSearch("MaThuoc", medicineQuery.ID),
		query.StringSearch("TenThuoc", medicineQuery.Name))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineListResponse{
		Response: SuccessfulResponse,
		Data:     medicines,
		PageInfo: gin.H{
			"page_size":  pageSize,
			"page":       page,
			"total_page": totalPage,
		},
	})
}

// @Summary Get medicine by id
// @Description Get medicine by id
// @Tags medicine
// @Produce json
// @Param id path string true "Medicine id"
// @Success 200 {object} MedicineResponse "Medicine response"
// @Router /medicine/{id} [get]
func GetMedicineByID(c *gin.Context) {
	id := c.Param("id")

	medicine, err := models.GetMedicineByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineResponse{
		Response: SuccessfulResponse,
		Data:     *medicine,
	})
}

// @Summary Create medicine
// @Description Create medicine
// @Tags medicine
// @Accept json
// @Produce json
// @Param data body MedicineRequest true "Medicine data"
// @Success 200 {object} MedicineResponse "Medicine response"
// @Router /medicine [post]
func CreateMedicine(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var input MedicineRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	medicine := models.Medicine{
		ID:        input.ID,
		Name:      input.Name,
		Quantity:  0,
		Price:     input.Price,
		Info:      input.Info,
		Unit:      input.Unit.Value(),
		UpdatedBy: &uid,
	}

	_, err = medicine.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	report := models.MedicineReport{
		MedicineID: medicine.ID,
		Quantity:   input.Quantity,
		Date:       medicine.CreatedAt,
		UpdatedBy:  medicine.UpdatedBy,
	}
	if _, err := report.Create(); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineResponse{
		Response: SuccessfulResponse,
		Data:     medicine,
	})
}

// @Summary Update medicine
// @Description Update medicine
// @Tags medicine
// @Accept json
// @Produce json
// @Param id path string true "Medicine id"
// @Param data body UpdateMedicineRequest true "Medicine data"
// @Success 200 {object} MedicineResponse "Medicine response"
// @Router /medicine/{id} [put]
func UpdateMedicine(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	id := c.Param("id")

	var input UpdateMedicineRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	medicine, err := models.GetMedicineByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	updatedMedicine := models.Medicine{
		Name:      input.Name,
		Quantity:  input.Quantity,
		Price:     input.Price,
		Info:      input.Info,
		Unit:      input.Unit.Value(),
		UpdatedBy: &uid,
	}

	medicine, err = medicine.Update(updatedMedicine)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineResponse{
		Response: SuccessfulResponse,
		Data:     *medicine,
	})
}

// @Summary Delete medicine
// @Description Delete medicine
// @Tags medicine
// @Produce json
// @Param id path string true "Medicine id"
// @Success 200 {object} MedicineResponse "Medicine response"
// @Router /medicine/{id} [delete]
func DeleteMedicine(c *gin.Context) {
	id := c.Param("id")

	medicine, err := models.GetMedicineByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	_, err = medicine.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, MedicineResponse{
		Response: SuccessfulResponse,
		Data:     *medicine,
	})
}

// @Summary Get medicine enums
// @Description Get medicine enums
// @Tags medicine
// @Produce json
// @Router /medicine/enums [get]
func GetMedicineEnums(c *gin.Context) {
	response := SuccessfulResponse

	response.Data = types.MedicineEnums

	c.JSON(http.StatusOK, response)
}
