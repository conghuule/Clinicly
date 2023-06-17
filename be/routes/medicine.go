package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addMedicineRoute(r *gin.RouterGroup) {
	group := r.Group("medicine")

	group.GET("", controllers.GetMedicine)
	group.GET(":id", controllers.GetMedicineByID)
	group.GET("enums", controllers.GetMedicineEnums)
	group.POST("", controllers.CreateMedicine)
	group.PUT(":id", controllers.UpdateMedicine)
	group.DELETE(":id", controllers.DeleteMedicine)
}
