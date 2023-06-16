package controllers

import (
	"clinic-management/models"
	"clinic-management/types"
	"clinic-management/utils"
	"clinic-management/utils/query"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type TicketRequest struct {
	PatientID uint  `json:"patient_id" binding:"required"`
	UpdatedBy *uint `json:"updated_by"`
}

type UpdateTicketRequest struct {
	Status    types.TicketStatus `json:"status"`
	UpdatedBy *uint              `json:"updated_by"`
}

type TicketResponse struct {
	Response
	Data models.Ticket `json:"data"`
}

type TicketListResponse struct {
	Response
	Data []models.Ticket `json:"data"`
}

type TicketQuery struct {
	PaginateQuery
	Status  types.TicketStatus `form:"status,default=0"`
	Date    *string            `form:"date"`
	OrderBy string             `form:"order_by,default=STT"`
	Desc    bool               `form:"desc,default=false"`
}

// @Summary Get ticket
// @Description Get ticket
// @Tags ticket
// @Produce json
// @Param status query types.TicketStatus false "Ticket status"
// @Param date query string false "Date"
// @Param order_by query string false "Order by" default(STT)
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} TicketListResponse "Ticket response"
// @Router /ticket [get]
func GetTicket(c *gin.Context) {
	var ticketQuery TicketQuery
	if err := c.ShouldBind(&ticketQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	if ticketQuery.Date == nil {
		now := utils.GetCurrentDateString()
		ticketQuery.Date = &now
	}

	tickets, err := models.GetTicket(query.Paginate(c),
		query.OrderBy(ticketQuery.OrderBy, ticketQuery.Desc),
		query.QueryByDate("NgayKham", *ticketQuery.Date),
		query.QueryByField("TrangThai", ticketQuery.Status.Value()))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, TicketListResponse{
		Response: SuccessfulResponse,
		Data:     tickets,
	})
}

// @Summary Create ticket
// @Description Create ticket
// @Tags ticket
// @Accept json
// @Produce json
// @Param data body TicketRequest true "Ticket data"
// @Success 200 {object} TicketResponse "Ticket response"
// @Router /ticket [post]
func CreateTicket(c *gin.Context) {
	var input TicketRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	now := time.Now()
	ticket := models.Ticket{
		PatientID: input.PatientID,
		Status:    types.Waiting.Value(),
		Date:      &(now),
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

// @Summary Update ticket
// @Description Update ticket
// @Tags ticket
// @Accept json
// @Produce json
// @Param id path int true "Ticket id"
// @Param data body UpdateTicketRequest true "Ticket data"
// @Success 200 {object} TicketResponse "Ticket response"
// @Router /ticket/{id} [put]
func UpdateTicket(c *gin.Context) {
	id := c.Param("id")

	var input UpdateTicketRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	ticket, err := models.GetTicketByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	updatedTicket := models.Ticket{
		Status:    input.Status.Value(),
		UpdatedBy: input.UpdatedBy,
	}

	ticket, err = ticket.Update(updatedTicket)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, TicketResponse{
		Response: SuccessfulResponse,
		Data:     *ticket,
	})
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
