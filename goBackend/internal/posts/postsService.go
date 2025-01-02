package posts

import (
	"context"
	"log"

	"goBackend/internal/common"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type PostsService interface {
	CreatePost(ctx context.Context, Title, Content, UserID string) error
	GetPosts(ctx context.Context) ([]Post, error)
	GetPostByPublicID(ctx context.Context, publicID string) (Post, error)
	EditPostByPublicID(ctx context.Context, publicID, title, content string) error
	DeletePostByPublicID(ctx context.Context, publicID string) error
}

type postsService struct {
}

func NewPostsService() *postsService {
	return &postsService{}
}

func (s *postsService) CreatePost(c context.Context, Title, Content, UserID string) error {
	//generate a new post id
	nanoid, err := gonanoid.New()
	if err != nil {
		log.Print(err)
		return err
	}
	post := Post{
		ID:      nanoid,
		Title:   Title,
		Content: Content,
		UserID:  UserID,
	}
	return CreatePost(common.GetDB(), c, post)

}

func (s *postsService) GetPosts(c context.Context) ([]Post, error) {
	return GetPosts(common.GetDB(), c)
}

func (s *postsService) GetPostByPublicID(c context.Context, publicID string) (Post, error) {
	return GetPostByPublicID(common.GetDB(), c, publicID)
}

func (s *postsService) EditPostByPublicID(c context.Context, publicID, title, content string) error {
	//get post with publicID
	post, err := GetPostByPublicID(common.GetDB(), c, publicID)
	if err != nil {
		return err
	}
	//update title and content
	post.Title = title
	post.Content = content
	return EditPostByPublicID(common.GetDB(), c, publicID, post)
}

func (s *postsService) DeletePostByPublicID(c context.Context, publicID string) error {
	return DeletePostByPublicID(common.GetDB(), c, publicID)
}
