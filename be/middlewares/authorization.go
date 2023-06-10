package middlewares

import (
	"clinic-management/controllers"
	"clinic-management/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authorize(c *gin.Context) {
	err := token.TokenValid(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, controllers.ErrorResponse("Unauthorized"))
		c.Abort()
		return
	}

	c.Next()
}
