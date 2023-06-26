package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/query"
	"clinic-management/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UpdateInvoiceRequest struct {
	PaymentStatus  bool `json:"payment_status"`
	DeliveryStatus bool `json:"delivery_status"`
}

type InvoiceResponse struct {
	Response
	Data models.Invoice `json:"data"`
}

type InvoiceListResponse struct {
	Response
	Data     []models.Invoice `json:"data"`
	PageInfo any              `json:"page_info"`
}

type InvoiceQuery struct {
	PaginateQuery
	Patient        string `form:"patient"`
	PaymentStatus  string `form:"payment_status"`
	DeliveryStatus string `form:"delivery_status"`
	Date           string `form:"date"`
	OrderBy        string `form:"order_by,default=NgayTao"`
	Desc           bool   `form:"desc,default=false"`
}

// @Summary Get invoice
// @Description Get invoice
// @Tags invoice
// @Produce json
// @Param patient query int false "Patient"
// @Param payment_status query bool false "Payment status"
// @Param delivery_status query bool false "Delivery status"
// @Param date query string false "Date"
// @Param order_by query int false "Order by" default(NgayTao)
// @Param desc query bool false "Order descending" default(false)
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

	paginate, page, pageSize, totalPage := query.Paginate(c, []models.Invoice{})
	invoices, err := models.GetInvoice(paginate,
		query.OrderBy(invoiceQuery.OrderBy, invoiceQuery.Desc),
		query.QueryByDate("NgayTao", invoiceQuery.Date),
		query.QueryByField("MaBN", invoiceQuery.Patient),
		query.QueryByField("TTThanhToan", invoiceQuery.PaymentStatus),
		query.QueryByField("TTGiaoThuoc", invoiceQuery.DeliveryStatus))
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, InvoiceListResponse{
		Response: SuccessfulResponse,
		Data:     invoices,
		PageInfo: gin.H{
			"page_size":  pageSize,
			"page":       page,
			"total_page": totalPage,
		},
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
	uid, err := token.ExtractUID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

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
		UpdatedBy:      &uid,
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
