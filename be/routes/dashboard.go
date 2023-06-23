package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addDashboardRoute(r *gin.RouterGroup) {
	group := r.Group("dashboard")

	group.GET("", controllers.GetDashboardReport)
}
