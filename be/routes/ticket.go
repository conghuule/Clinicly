package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addTicketRoute(r *gin.RouterGroup) {
	group := r.Group("ticket")

	group.GET("", controllers.GetTicket)
	group.POST("", controllers.CreateTicket)
	group.DELETE(":id", controllers.DeleteTicket)
	group.GET("enums", controllers.GetTicketEnums)
}
