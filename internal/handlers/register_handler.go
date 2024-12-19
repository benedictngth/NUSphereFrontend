package handlers

import (
	"context"
	"goBackend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required, email"`
	Password string `json:"password" binding:"required, min=6"`
}

func RegisterHandler(authService services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req RegisterRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		user, err := authService.Register(context.Background(), req.Username, req.Email, req.Password)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "registration failed"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"user_id": user.ID, "username": user.Username, "email": "user.Email"})

	}
}
