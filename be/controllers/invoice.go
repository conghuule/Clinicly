package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UpdateInvoiceRequest struct {
	PaymentStatus  bool  `json:"payment_status"`
	DeliveryStatus bool  `json:"delivery_status"`
	UpdatedBy      *uint `json:"updated_by"`
}

type InvoiceResponse struct {
	Response
	Data models.Invoice `json:"data"`
}

type InvoiceListResponse struct {
	Response
	Data []models.Invoice `json:"data"`
}

type InvoiceQuery struct {
	PaginateQuery
}

// @Summary Get invoice
// @Description Get invoice
// @Tags invoice
// @Produce json
// @Param page query int false "Page" default(1)
// @Param page_size query int false "Page size" default(10)
// @Success 200 {object} InvoiceListResponse "Invoice response"
// @Router /invoice [get]
func GetInvoice(c *gin.Context) {
	var invoiceQuery InvoiceQuery
	if err := c.ShouldBind(&invoiceQuery); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	invoices, err := models.GetInvoice(query.Paginate(c))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, InvoiceListResponse{
		Response: SuccessfulResponse,
		Data:     invoices,
	})
}

// @Summary Get invoice by id
// @Description Get invoice by id
// @Tags invoice
// @Produce json
// @Param id path int true "Invoice id"
// @Success 200 {object} InvoiceResponse "Invoice response"
// @Router /invoice/{id} [get]
func GetInvoiceByID(c *gin.Context) {
	id := c.Param("id")

	invoice, err := models.GetInvoiceByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, InvoiceResponse{
		Response: SuccessfulResponse,
		Data:     *invoice,
	})
}

// @Summary Update invoice
// @Description Update invoice
// @Tags invoice
// @Accept json
// @Produce json
// @Param id path int true "Invoice id"
// @Param data body UpdateInvoiceRequest true "Invoice data"
// @Success 200 {object} InvoiceResponse "Invoice response"
// @Router /invoice/{id} [put]
func UpdateInvoice(c *gin.Context) {
	id := c.Param("id")

	var input UpdateInvoiceRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	invoice, err := models.GetInvoiceByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	updatedInvoice := models.Invoice{
		PaymentStatus:  input.PaymentStatus,
		DeliveryStatus: input.DeliveryStatus,
		UpdatedBy:      input.UpdatedBy,
	}

	invoice, err = invoice.Update(updatedInvoice)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, InvoiceResponse{
		Response: SuccessfulResponse,
		Data:     *invoice,
	})
}

// @Summary Delete invoice
// @Description Delete invoice
// @Tags invoice
// @Produce json
// @Param id path int true "Invoice id"
// @Success 200 {object} InvoiceResponse "Invoice response"
// @Router /invoice/{id} [delete]
func DeleteInvoice(c *gin.Context) {
	id := c.Param("id")

	invoice, err := models.GetInvoiceByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	_, err = invoice.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, InvoiceResponse{
		Response: SuccessfulResponse,
		Data:     *invoice,
	})
}
