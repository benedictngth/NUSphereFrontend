package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"goBackend/internal/categories"
	"goBackend/internal/comments"
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
	commentsService := comments.NewCommentsService()
	r := gin.Default()
	// Attach log request body and recovery middleware
	r.Use(common.LogRequestBodyMiddleware())
	r.Use(gin.Recovery())

	v1 := r.Group("/api")
	users.Users(v1.Group("/users"), authService)

	posts.Posts(v1.Group("/posts"), postService)
	//protected routes with JWT cookie middleware
	v1.Use(users.AuthMiddleware(cfg.JWTSecret))
	users.AuthUsers(v1.Group("/users"), authService)
	users.Profile(v1.Group("/users"))

	comments.Comments(v1.Group("/comments"), commentsService)
	categories.Categories(v1.Group("/categories"), categoriesService)

	port := cfg.Port
	if port == "" {
		port = "8080"
	}
	log.Printf("server is running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("unable to start server: %v\n", err)
	}
}
