package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"goBackend/internal/common"
	"goBackend/internal/config"
	"goBackend/internal/users"
)

func main() {
	cfg := config.LoadConfig()
	fmt.Println(cfg)

	pool, err := common.NewPG(context.Background(), cfg.DataBaseURL)

	if err != nil {
		log.Fatalf("unable to create connection pool: %v\n", err)
	}
	defer pool.Close()

	//create repository and services

	authService := users.NewAuthService(*pool, cfg.JWTSecret)

	r := gin.Default()

	v1 := r.Group("/api")
	users.UsersRegister(v1.Group("/users"), authService)

	//reimplement protected route
	// protected := v1.Group("/profile")
	// protected.Use(users.AuthMiddleware(cfg.JWTSecret))
	// {
	// 	protected.GET("/profile", func(c *gin.Context) {
	// 		user, err := c.Get("user_id")
	// 		if !err {
	// 			c.JSON(404, gin.H{"error": "user not found"})
	// 			return
	// 		}
	// 		c.JSON(200, gin.H{"user": user})
	// 	})
	// }

	port := cfg.Port
	if port == "" {
		port = "8080"
	}
	log.Printf("server is running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("unable to start server: %v\n", err)
	}
}
