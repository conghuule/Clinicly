package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addMedicineRoute(r *gin.RouterGroup) {
	group := r.Group("medicine")

	group.GET("", controllers.GetMedicine)
	group.POST("", controllers.GetMedicine)
}
