package controllers

import (
	"clinic-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/datatypes"
)

type RegulationRequest struct {
	Name      string         `json:"name" binding:"required"`
	Value     datatypes.JSON `json:"value" binding:"required"`
	UpdatedBy *uint          `json:"updated_by" binding:"required"`
}

type UpdateRegulationRequest struct {
	Name      string         `json:"name"`
	Value     datatypes.JSON `json:"value"`
	UpdatedBy *uint          `json:"updated_by"`
}

type RegulationResponse struct {
	Response
	Data models.Regulation `json:"data"`
}

type RegulationListResponse struct {
	Response
	Data []models.Regulation `json:"data"`
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
	var input RegulationRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	regulation := models.Regulation{
		Name:      input.Name,
		Value:     input.Value,
		UpdatedBy: input.UpdatedBy,
	}

	_, err := regulation.CreateRegulation()
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
		UpdatedBy: input.UpdatedBy,
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

// @Summary Get regulation
// @Description Get regulation
// @Tags regulation
// @Produce json
// @Success 200 {object} RegulationListResponse "Regulation response"
// @Router /regulation [get]
func GetRegulation(c *gin.Context) {
	regulations, err := models.GetRegulation()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, RegulationListResponse{
		Response: SuccessfulResponse,
		Data:     regulations,
	})
}
