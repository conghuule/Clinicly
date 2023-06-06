package routes

import "github.com/gin-gonic/gin"

func Config(r *gin.Engine) {
	addSwaggerRoute(r)

	v1 := r.Group("api/v1")
	{
		addAuthRoute(v1)
		addStaffRoute(v1)
	}
}
