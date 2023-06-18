package main

import (
	"clinic-management/models"
	"clinic-management/routes"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @title Clinic Management
// @description Clinic Management API
// @version 1.0
// @host clinicly.fly.dev
// @schemes https
// @BasePath /api/v1
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	models.ConnectDB()

	r := gin.Default()
	routes.Config(r)

	port := os.Getenv("SV_PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
