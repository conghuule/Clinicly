package middlewares

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var allowOrigins = []string{"http://localhost:3000"}

func Cors(c *gin.Context) {
	config := cors.DefaultConfig()
	config.AllowCredentials = true
	config.AllowOrigins = allowOrigins

	cors.New(config)(c)
}
