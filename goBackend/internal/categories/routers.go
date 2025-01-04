package categories

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Categories(router *gin.RouterGroup, categoriesService CategoriesService) {
	router.POST("/create", CreateCategoryHandler(categoriesService))
	router.GET("", GetCategoriesHandler(categoriesService))
	// // router.PUT("/edit/:id", EditCategoryHandler(categoriesService))
	// router.DELETE("/delete/:id", DeleteCategoryHandler(categoriesService))
}

func CreateCategoryHandler(categoriesService CategoriesService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req NewCategoryRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
			return
		}
		err := categoriesService.CreateCategory(context.Background(), req.Name, req.Description)
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "category creation failed"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "category created"})
	}
}

func GetCategoriesHandler(categoriesService CategoriesService) gin.HandlerFunc {
	return func(c *gin.Context) {
		categories, err := categoriesService.GetCategories(context.Background())
		if err != nil {
			c.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to get categories"})
			return
		}
		c.JSON(http.StatusOK, categories)
	}
}

//implement if necessary

// func DeleteCategoryHandler(categoriesService CategoriesService) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		publicID := c.Param("id")
// 		err := categoriesService.DeleteCategoryByPublicID(context.Background(), publicID)
// 		if err != nil {
// 			c.Error(err)
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "category deletion failed"})
// 			return
// 		}
// 		c.JSON(http.StatusOK, gin.H{"message": "category deleted"})
// 	}
// }

//implement if necessary
// func EditCategoryHandler(categoriesService CategoriesService) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		publicID := c.Param("id")
// 		var req EditCategoryRequest
// 		if err := c.ShouldBindJSON(&req); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
// 			return
// 		}
// 		err := categoriesService.EditCategory(context.Background(), publicID, req.Name, req.Description)
// 		if err != nil {
// 			c.Error(err)
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "category edit failed"})
// 			return
// 		}
// 		c.JSON(http.StatusOK, gin.H{"message": "category edited"})
// 	}
// }
