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
	Response
	Data models.User `json:"data"`
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
		c.JSON(http.StatusBadRequest, ErrorResponse(err.Error()))
		return
	}

	user := &models.User{}
	user.Email = input.Email
	user.Password = input.Password
	token, err := loginCheck(user.Email, user.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse("email or password is incorrect."))
		return
	}

	user, _ = models.GetUserByEmail(input.Email)

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", token, 3600*24, "", "", false, true)
	c.JSON(http.StatusOK, LoginResponse{
		Response: SuccessfulResponse,
		Data:     *user,
	})
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
