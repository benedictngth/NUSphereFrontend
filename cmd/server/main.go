package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"goBackend/internal/config"
	pg "goBackend/internal/db/repository"
	"goBackend/internal/handlers"
	"goBackend/internal/services"
)

func main() {
	cfg := config.LoadConfig()
	fmt.Println(cfg)

	pool, err := pg.NewPG(context.Background(), cfg.DataBaseURL)

	if err != nil {
		log.Fatalf("unable to create connection pool: %v\n", err)
	}
	defer pool.Close()

	//create repository and services
	authService := services.NewAuthService(*pool, cfg.JWTSecret)

	r := gin.Default()

	r.POST("/register", handlers.RegisterHandler(authService))
	r.POST("/login", handlers.LoginHandler(authService))

	protected := r.Group("/")
	protected.Use(handlers.AuthMiddleware(cfg.JWTSecret))
	{
		protected.GET("/profile", func(c *gin.Context) {
			user, err := c.Get("user_id")
			if !err {
				c.JSON(404, gin.H{"error": "user not found"})
				return
			}
			c.JSON(200, gin.H{"user": user})
		})
	}

	port := cfg.Port
	if port == "" {
		port = "8080"
	}
	log.Printf("server is running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("unable to start server: %v\n", err)
	}
}
