package controllers

import (
	"clinic-management/models"
	"clinic-management/types"
	"clinic-management/utils/query"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type TicketRequest struct {
	PatientID uint  `json:"patient_id" binding:"required"`
	UpdatedBy *uint `json:"updated_by"`
}

type TicketResponse struct {
	Response
	Data models.Ticket `json:"data"`
}

type TicketListResponse struct {
	Response
	Data []models.Ticket `json:"data"`
}

// @Summary Create waiting ticket
// @Description Create waiting ticket
// @Tags ticket
// @Accept json
// @Produce json
// @Param data body TicketRequest true "Waiting ticket data"
// @Success 200 {object} TicketListResponse "Waiting ticket response"
// @Router /ticket [post]
func CreateTicket(c *gin.Context) {
	var input TicketRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	ticket := models.Ticket{
		PatientID: input.PatientID,
		Status:    types.Waiting.Value(),
		Date:      time.Now(),
		UpdatedBy: input.UpdatedBy,
	}

	_, err := ticket.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, TicketResponse{
		Response: SuccessfulResponse,
		Data:     ticket,
	})
}

// @Summary Get ticket
// @Description Get ticket
// @Tags ticket
// @Produce json
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} TicketListResponse "Ticket response"
// @Router /ticket [get]
func GetTicket(c *gin.Context) {
	tickets, err := models.GetTicket(query.Paginate(c))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, TicketListResponse{
		Response: SuccessfulResponse,
		Data:     tickets,
	})
}

// @Summary Get ticket enums
// @Description Get ticket enums
// @Tags ticket
// @Produce json
// @Router /ticket/enums [get]
func GetTicketEnums(c *gin.Context) {
	response := SuccessfulResponse

	response.Data = types.TicketEnums

	c.JSON(http.StatusOK, response)
}

// @Summary Delete ticket
// @Description Delete ticket
// @Tags ticket
// @Produce json
// @Param id path int true "Ticket id"
// @Success 200 {object} TicketResponse "Ticket response"
// @Router /ticket/{id} [delete]
func DeleteTicket(c *gin.Context) {
	id := c.Param("id")

	ticket, err := models.GetTicketByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	_, err = ticket.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, TicketResponse{
		Response: SuccessfulResponse,
		Data:     *ticket,
	})
}
