package middlewares

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors(c *gin.Context) {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true

	cors.New(config)(c)
}
