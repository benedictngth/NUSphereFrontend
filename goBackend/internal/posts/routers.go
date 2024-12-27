package posts

import (
	// "errors"
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Posts(router *gin.RouterGroup, postsService PostsService) {
	router.POST("/create", CreatePostHandler(postsService))
	router.GET("", GetPostsHandler(postsService))
	router.GET("/:id", GetPostByIDHandler(postsService))
	router.PUT("/edit/:id", EditPostByPublicIDHandler(postsService))
}

type NewPostRequest struct {
	NewPost NewPost `json:"post" binding:"required"`
}

type EditPostRequest struct {
	//not sure what the actual json key should be to unpackage request from client side
	EditPost EditPost `json:"post" binding:"required"`
}

func CreatePostHandler(postsService PostsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req NewPostRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			log.Print(c)
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		//insert post into db
		err := postsService.CreatePost(context.Background(), req.NewPost)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "post creation failed"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "post created"})
	}
}

func GetPostsHandler(postsService PostsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		posts, err := postsService.GetPosts(context.Background())
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to get posts"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"posts": posts})
	}
}

func GetPostByIDHandler(postsService PostsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		publicID := c.Param("id")
		//get post by public id
		post, err := postsService.GetPostByPublicID(context.Background(), publicID)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to get post"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"post": post})
	}
}

func EditPostByPublicIDHandler(postsService PostsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		publicID := c.Param("id")
		var req EditPostRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		//edit post by public id
		err := postsService.EditPostByPublicID(context.Background(), publicID, req.EditPost.Title, req.EditPost.Content)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to edit post"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "post edited"})
	}
}
