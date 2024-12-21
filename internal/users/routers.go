package users

import (
	// "errors"
	"context"
	"github.com/gin-gonic/gin"
	// "goBackend/internal/common"

	"net/http"
)

func UsersRegister(router *gin.RouterGroup, authService AuthService) {
	router.POST("/register", RegisterHandler(authService))
	router.POST("/login", LoginHandler(authService))
}

func Profile(router *gin.RouterGroup) {
	router.GET("/profile", func(c *gin.Context) {
		user, err := c.Get("user_id")
		if !err {
			c.JSON(404, gin.H{"error": "user not found"})
			return
		}
		c.JSON(200, gin.H{"user": user})
	})
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

func RegisterHandler(authService AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req RegisterRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		user, err := authService.Register(context.Background(), req.Username, req.Email, req.Password)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "registration failed"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"user_id": user.ID, "username": user.Username, "email": "user.Email"})

	}
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func LoginHandler(authService AuthService) gin.HandlerFunc {
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
