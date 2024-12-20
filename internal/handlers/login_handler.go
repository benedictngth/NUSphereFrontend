package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	"goBackend/internal/services"
)

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func LoginHandler(authService services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req LoginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}

		token, err := authService.Login(context.Background(), req.Username, req.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"token": token})
	}
}
