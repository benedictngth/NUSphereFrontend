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
	v1.Use(users.AuthMiddleware(cfg.JWTSecret))
	users.Profile(v1.Group("/users"))

	port := cfg.Port
	if port == "" {
		port = "8080"
	}
	log.Printf("server is running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("unable to start server: %v\n", err)
	}
}
