package controllers

import (
	"clinic-management/models"
	"clinic-management/types"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type TicketRequest struct {
	PatientID uint `json:"patient_id" binding:"required"`
}

type UpdateTicketRequest struct {
	Status types.TicketStatus `json:"status" binding:"required"`
}

type TicketResponse struct {
	Response
	Data models.Ticket `json:"data"`
}

type TicketListResponse struct {
	Response
	Data     []models.Ticket `json:"data"`
	PageInfo any             `json:"page_info"`
}

type TicketQuery struct {
	PaginateQuery
	Status  types.TicketStatus `form:"status,default=0"`
	Date    string             `form:"date"`
	OrderBy string             `form:"order_by,default=STT"`
	Desc    bool               `form:"desc,default=false"`
}

// @Summary Get ticket
// @Description Get ticket
// @Tags ticket
// @Produce json
// @Param status query types.TicketStatus false "Ticket status"
// @Param date query string false "Date"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
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

	paginate, page, pageSize, totalPage := query.Paginate(c, []models.Ticket{})
	tickets, err := models.GetTicket(paginate,
		query.OrderBy(ticketQuery.OrderBy, ticketQuery.Desc),
		query.QueryByDate("NgayKham", ticketQuery.Date),
		query.QueryByField("TrangThai", ticketQuery.Status.Value()))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, TicketListResponse{
		Response: SuccessfulResponse,
		Data:     tickets,
		PageInfo: gin.H{
			"page_size":  pageSize,
			"page":       page,
			"total_page": totalPage,
		},
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
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

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
		UpdatedBy: &uid,
	}

	_, err = ticket.Create()
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
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

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
		UpdatedBy: &uid,
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
