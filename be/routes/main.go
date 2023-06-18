package routes

import (
	"clinic-management/controllers"
	"clinic-management/middlewares"
	"clinic-management/types"
	"net/http"

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

	v1 := r.Group("api/v1")
	{
		addAuthRoute(v1)

		v1.Use(middlewares.Authorize)
		v1.Use(middlewares.Cors)

		addStaffRoute(v1)
		addPatientRoute(v1)
		addTicketRoute(v1)
		addRegulationRoute(v1)
		addMedicalReportRoute(v1)
		addMedicineRoute(v1)
		addInvoiceRoute(v1)
	}

	addSwaggerRoute(r)

	r.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, controllers.ErrorResponse("Not found")) })
}
