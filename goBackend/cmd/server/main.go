package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"goBackend/internal/categories"
	"goBackend/internal/common"
	"goBackend/internal/config"
	"goBackend/internal/posts"
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

	//create repository and services structs
	authService := users.NewAuthService(cfg.JWTSecret)
	postService := posts.NewPostsService()
	categoriesService := categories.NewCategoriesService()
	r := gin.Default()
	// Attach log request body and recovery middleware
	r.Use(common.LogRequestBodyMiddleware())
	r.Use(gin.Recovery())

	v1 := r.Group("/api")
	users.Users(v1.Group("/users"), authService)
	categories.Categories(v1.Group("/categories"), categoriesService)

	//protected routes with JWT cookie middleware
	v1.Use(users.AuthMiddleware(cfg.JWTSecret))
	posts.Posts(v1.Group("/posts"), postService)
	users.Profile(v1.Group("/users"))
	users.AuthUsers(v1.Group("/users"), authService)

	port := cfg.Port
	if port == "" {
		port = "8080"
	}
	log.Printf("server is running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("unable to start server: %v\n", err)
	}
}
