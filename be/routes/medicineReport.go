package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addMedicineReportRoute(r *gin.RouterGroup) {
	group := r.Group("medicine-report")

	group.GET("", controllers.GetMedicineReport)
	group.GET(":id", controllers.GetMedicineReportByID)
	group.POST("", controllers.CreateMedicineReport)
	group.PUT(":id", controllers.UpdateMedicineReport)
	group.DELETE(":id", controllers.DeleteMedicineReport)
}
