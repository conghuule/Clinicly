package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RegulationRequest struct {
	Name  string `json:"name" binding:"required"`
	Value int    `json:"value" binding:"required"`
}

type UpdateRegulationRequest struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type RegulationResponse struct {
	Response
	Data models.Regulation `json:"data"`
}

type RegulationListResponse struct {
	Response
	Data []models.Regulation `json:"data"`
}

type RegulationQuery struct {
	PaginateQuery
	ID      string `form:"id"`
	Name    string `form:"name"`
	OrderBy string `form:"order_by,default=NgayTao"`
	Desc    bool   `form:"desc,default=false"`
}

// @Summary Get regulation
// @Description Get regulation
// @Tags regulation
// @Produce json
// @Param id query string false "Regulation id"
// @Param name query string false "Regulation name"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} RegulationListResponse "Regulation response"
// @Router /regulation [get]
func GetRegulation(c *gin.Context) {
	var regulationQuery RegulationQuery
	if err := c.ShouldBind(regulationQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	regulations, err := models.GetRegulation(query.Paginate(c),
		query.StringSearch("MaQD", regulationQuery.ID),
		query.StringSearch("TenQD", regulationQuery.Name),
		query.OrderBy(regulationQuery.OrderBy, regulationQuery.Desc))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, RegulationListResponse{
		Response: SuccessfulResponse,
		Data:     regulations,
	})
}

// @Summary Create regulation
// @Description Create regulation
// @Tags regulation
// @Accept json
// @Produce json
// @Param data body RegulationRequest true "Regulation data"
// @Success 200 {object} RegulationResponse "Regulation response"
// @Router /regulation [post]
func CreateRegulation(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	var input RegulationRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	regulation := models.Regulation{
		Name:      input.Name,
		Value:     input.Value,
		UpdatedBy: &uid,
	}

	_, err = regulation.CreateRegulation()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, RegulationResponse{
		Response: SuccessfulResponse,
		Data:     regulation,
	})
}

// @Summary Update regulation
// @Description Update regulation
// @Tags regulation
// @Accept json
// @Produce json
// @Param id path int true "Regulation id"
// @Param data body UpdateRegulationRequest true "Regulation data"
// @Success 200 {object} RegulationResponse "Regulation response"
// @Router /regulation/{id} [put]
func UpdateRegulation(c *gin.Context) {
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	id := c.Param("id")

	var input UpdateRegulationRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	regulation, err := models.GetRegulationByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	updatedRegulation := models.Regulation{
		Name:      input.Name,
		Value:     input.Value,
		UpdatedBy: &uid,
	}

	regulation, err = regulation.UpdateRegulation(updatedRegulation)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, RegulationResponse{
		Response: SuccessfulResponse,
		Data:     *regulation,
	})
}

// @Summary Delete regulation
// @Description Delete regulation
// @Tags regulation
// @Produce json
// @Param id path int true "Regulation id"
// @Success 200 {object} RegulationResponse "Regulation response"
// @Router /regulation/{id} [delete]
func DeleteRegulation(c *gin.Context) {
	id := c.Param("id")

	regulation, err := models.GetRegulationByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	regulation, err = regulation.DeleteRegulation()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, RegulationResponse{
		Response: SuccessfulResponse,
		Data:     *regulation,
	})
}
