package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addInvoiceRoute(r *gin.RouterGroup) {
	group := r.Group("invoice")

	group.GET("", controllers.GetInvoice)
	group.GET(":id", controllers.GetInvoiceByID)
	group.PUT(":id", controllers.UpdateInvoice)
	group.DELETE(":id", controllers.DeleteInvoice)
}
