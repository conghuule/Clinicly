package controllers

import (
	"clinic-management/models"
	"clinic-management/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

// @Summary Login
// @Description Login your account
// @Tags auth
// @Accept json
// @Produce json
// @Param data body LoginRequest true "Login data"
// @Success 200 {object} LoginResponse "Login response"
// @Router /auth/login [post]
func Login(c *gin.Context) {
	var input LoginRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := models.User{}
	u.Email = input.Email
	u.Password = input.Password
	token, err := loginCheck(u.Email, u.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email or password is incorrect."})
		return
	}

	c.JSON(http.StatusOK, LoginResponse{Token: token})
}

func loginCheck(email, password string) (string, error) {
	user, err := models.GetUserByEmail(email)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", err
	}

	token, err := token.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}
