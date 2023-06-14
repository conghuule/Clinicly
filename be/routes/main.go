package routes

import (
	"clinic-management/middlewares"
	"clinic-management/types"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func ValidateEnum(fl validator.FieldLevel) bool {
	value := fl.Field().Interface().(types.Enum)
	return value.IsValid()
}

func Config(r *gin.Engine) {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("enum", ValidateEnum)
	}

	addSwaggerRoute(r)

	v1 := r.Group("api/v1")
	{
		addAuthRoute(v1)

		authorizedRoute := v1.Group("")

		authorizedRoute.Use(middlewares.Authorize)

		addStaffRoute(authorizedRoute)
		addPatientRoute(authorizedRoute)
		addTicketRoute(authorizedRoute)
		addRegulationRoute(authorizedRoute)
	}
}
