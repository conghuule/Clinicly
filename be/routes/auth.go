package routes

import (
	"clinic-management/controllers"

	"github.com/gin-gonic/gin"
)

func addAuthRoute(r *gin.RouterGroup) {
	group := r.Group("auth")

	group.POST("login", controllers.Login)
}
