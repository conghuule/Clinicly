package routes

import (
	_ "clinic-management/docs"
	"net/http"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func addSwaggerRoute(r *gin.Engine) {
	r.GET("/docs", func(c *gin.Context) { c.Redirect(http.StatusFound, "/docs/index.html") })
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
