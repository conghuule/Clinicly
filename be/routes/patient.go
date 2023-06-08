package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addPatientRoute(r *gin.RouterGroup) {
	group := r.Group("patient")

	group.GET("", controllers.GetPatient)
	group.GET(":id", controllers.GetPatientByID)
	group.POST("create", controllers.CreatePatient)
}
