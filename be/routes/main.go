package routes

import (
	"clinic-management/middlewares"

	"github.com/gin-gonic/gin"
)

func Config(r *gin.Engine) {
	addSwaggerRoute(r)

	v1 := r.Group("api/v1")
	{
		addAuthRoute(v1)

		authorizedRoute := v1.Group("")

		authorizedRoute.Use(middlewares.Authorize)

		addStaffRoute(authorizedRoute)
		addPatientRoute(authorizedRoute)
	}
}
