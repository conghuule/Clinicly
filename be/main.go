package main

import (
	"clinic-management/models"
	"clinic-management/routes"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @title Clinic Management
// @description Clinic Management API
// @version 1.0
// @host localhost:8080
// @schemes http https
// @BasePath /api/v1
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	gin.SetMode(os.Getenv("GIN_MODE"))

	configTimezone()

	models.ConnectDB()

	r := gin.Default()
	routes.Config(r)

	port := os.Getenv("SV_PORT")
	r.Run(":" + port)
}

func configTimezone() {
	loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
	if err != nil {
		log.Fatalf(err.Error())
	}
	time.Local = loc
}
