package comments

import (
	// "errors"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func Comments(router *gin.RouterGroup, commentsService CommentsService) {
	router.POST("/create", CreateCommentHandler(commentsService))
	router.GET("", GetCommentsByPostIDHandler(commentsService))
	router.GET("/:id", GetCommentByPublicIDHandler(commentsService))
	router.PUT("/edit/:id", EditCommentByPublicIDHandler(commentsService))
	router.DELETE("/delete/:id", DeleteCommentByPublicIDHandler(commentsService))
	//TODO implement get comments by post id
}

func CreateCommentHandler(commentsService CommentsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		time.Sleep(1 * time.Second)
		var req NewCommentRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		//insert comment into db
		err := commentsService.CreateComment(context.Background(), req.Content, req.UserID, req.PostID)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "comment creation failed"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "comment created"})
	}
}

func GetCommentsByPostIDHandler(commentsService CommentsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		time.Sleep(1 * time.Second)
		postID := c.Query("postID")
		if postID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "postId is required"})
		}
		//get comments by post id
		comments, err := commentsService.GetCommentsByPostID(context.Background(), postID)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to get comments"})
			return
		}
		c.JSON(http.StatusOK, comments)
	}
}

func GetCommentByPublicIDHandler(commentsService CommentsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		time.Sleep(1 * time.Second)
		publicID := c.Param("id")
		//get comment by public id
		comment, err := commentsService.GetCommentByPublicID(context.Background(), publicID)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to get comment"})
			return
		}
		c.JSON(http.StatusOK, comment)
	}
}

func EditCommentByPublicIDHandler(commentsService CommentsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		time.Sleep(1 * time.Second)
		publicID := c.Param("id")
		var req EditCommentRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		//edit comment by public id
		err := commentsService.EditCommentByPublicID(context.Background(), publicID, req.Content)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to edit comment"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "comment edited"})
	}
}

func DeleteCommentByPublicIDHandler(commentsService CommentsService) gin.HandlerFunc {
	return func(c *gin.Context) {
		time.Sleep(1 * time.Second)
		publicID := c.Param("id")
		//delete comment by public id
		err := commentsService.DeleteCommentByPublicID(context.Background(), publicID)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to delete comment"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "comment deleted"})
	}
}
