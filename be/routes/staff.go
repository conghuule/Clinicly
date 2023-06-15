package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addStaffRoute(r *gin.RouterGroup) {
	group := r.Group("staff")

	group.GET("", controllers.GetStaff)
	group.GET(":id", controllers.GetStaffByID)
	group.POST("", controllers.CreateStaff)
	group.PUT(":id", controllers.UpdateStaff)
	group.DELETE(":id", controllers.DeleteStaff)
	group.GET("enums", controllers.GetStaffEnums)
}
