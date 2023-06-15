package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addMedicalReportRoute(r *gin.RouterGroup) {
	group := r.Group("medical-report")

	group.GET("", controllers.GetMedicalReport)
	group.GET(":id", controllers.GetMedicalReportByID)
	group.POST("", controllers.CreateMedicalReport)
}
