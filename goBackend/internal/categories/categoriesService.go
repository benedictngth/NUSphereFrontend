package categories

import (
	"context"
	"log"

	"goBackend/internal/common"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type CategoriesService interface {
	CreateCategory(ctx context.Context, Name, Description string) error
	GetCategories(ctx context.Context) ([]CategoryPublic, error)
}

type categoriesService struct {
}

func NewCategoriesService() *categoriesService {
	return &categoriesService{}
}

func (s *categoriesService) CreateCategory(c context.Context, Name, Description string) error {
	nanoid, err := gonanoid.New()
	if err != nil {
		log.Print(err)
		return err
	}
	category := CategoryPublic{
		ID:          nanoid,
		Name:        Name,
		Description: Description,
	}
	return CreateCategory(common.GetDB(), c, category)

}

func (s *categoriesService) GetCategories(c context.Context) ([]CategoryPublic, error) {
	return GetCategories(common.GetDB(), c)
}

// func (s *categoriesService) DeleteCategoryByPublicID(c context.Context, publicID string) error {
// 	return DeleteCategoryByPublicID(common.GetDB(), c, publicID)
// }
