package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addPatientRoute(r *gin.RouterGroup) {
	group := r.Group("patient")

	group.GET("", controllers.GetPatient)
	group.GET(":id", controllers.GetPatientByID)
	group.POST("", controllers.CreatePatient)
	group.PUT(":id", controllers.UpdatePatient)
	group.DELETE(":id", controllers.DeletePatient)
	group.GET("enums", controllers.GetPatientEnums)
}
