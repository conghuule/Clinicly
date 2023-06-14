package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addRegulationRoute(r *gin.RouterGroup) {
	group := r.Group("regulation")

	group.GET("", controllers.GetRegulation)
	group.PUT(":id", controllers.UpdateRegulation)
	group.DELETE(":id", controllers.DeleteRegulation)
	group.POST("", controllers.CreateRegulation)
}
